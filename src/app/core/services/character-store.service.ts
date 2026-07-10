import { computed, Injectable, signal } from '@angular/core';
import { HttpErrorResponse, httpResource } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import type { Character, CharacterListResponse, PageInfo } from '../models/character.model';
import type { CharacterFilter } from '../models/character-filter.model';

/**
 * Reactive, signal-based store for Rick and Morty character data.
 *
 * Data fetching is declarative: `httpResource` re-requests the API automatically
 * whenever the `page` or `filter` signals change, so consumers only need to read
 * the exposed computed signals and issue commands.
 */
@Injectable({ providedIn: 'root' })
export class CharacterStore {
  private readonly charactersUrl = `${environment.apiBaseUrl}/character`;

  private readonly _page = signal(1);
  private readonly _filter = signal<CharacterFilter>({});

  /** Filter entries with a meaningful value, ready to be sent as query params. */
  private readonly activeFilter = computed<Record<string, string>>(() =>
    Object.fromEntries(
      Object.entries(this._filter()).filter(
        (entry): entry is [string, string] => entry[1] != null && entry[1] !== '',
      ),
    ),
  );

  private readonly listResource = httpResource<CharacterListResponse>(() => ({
    url: this.charactersUrl,
    params: { page: this._page(), ...this.activeFilter() },
  }));

  /**
   * Total number of characters in the unfiltered API, fetched once.
   * Used by the detail view to bound its "previous / next" navigation.
   */
  private readonly totalResource = httpResource<CharacterListResponse>(() => this.charactersUrl);

  private readonly errorStatus = computed<number | undefined>(() => {
    const error = this.listResource.error();
    return error instanceof HttpErrorResponse ? error.status : undefined;
  });

  // Reading `resource.value()` throws while the resource is in an error state,
  // so we guard every access with `hasValue()` and fall back to `undefined`.
  private readonly list = computed<CharacterListResponse | undefined>(() =>
    this.listResource.hasValue() ? this.listResource.value() : undefined,
  );
  private readonly total = computed<CharacterListResponse | undefined>(() =>
    this.totalResource.hasValue() ? this.totalResource.value() : undefined,
  );

  // ---- Public, read-only reactive state ------------------------------------

  readonly page = this._page.asReadonly();
  readonly filter = this._filter.asReadonly();

  readonly characters = computed<readonly Character[]>(() => this.list()?.results ?? []);
  readonly pageInfo = computed<PageInfo | undefined>(() => this.list()?.info);
  readonly totalCount = computed(() => this.pageInfo()?.count ?? 0);
  readonly totalCharacters = computed(() => this.total()?.info.count ?? 0);

  readonly isLoading = this.listResource.isLoading;

  /** The API answers with 404 when a filter matches nothing — treated as "empty", not a failure. */
  readonly notFound = computed(() => this.errorStatus() === 404);
  readonly hasError = computed(() => {
    const status = this.errorStatus();
    return status !== undefined && status !== 404;
  });

  // ---- Commands ------------------------------------------------------------

  goToPage(page: number): void {
    this._page.set(page);
  }

  applyFilter(filter: CharacterFilter): void {
    this._filter.set(filter);
    this._page.set(1);
  }

  reload(): void {
    this.listResource.reload();
  }
}
