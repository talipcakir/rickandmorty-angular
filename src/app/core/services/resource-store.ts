import { computed, Signal } from '@angular/core';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { signal } from '@angular/core';

import type { ListResponse, PageInfo } from '../models/list-response.model';

/** A filter object of optional string fields (interfaces don't satisfy an
 * index-signature constraint, so we accept any object and read it loosely). */
type StringFilter = object;

export interface ResourceStore<T, F extends StringFilter> {
  readonly page: Signal<number>;
  readonly filter: Signal<F>;
  readonly items: Signal<readonly T[]>;
  readonly pageInfo: Signal<PageInfo | undefined>;
  /** Total items matching the current filter. */
  readonly filteredCount: Signal<number>;
  /** Total items in the unfiltered resource — used to bound detail prev/next. */
  readonly grandTotal: Signal<number>;
  readonly isLoading: Signal<boolean>;
  /** The API answers 404 when a filter matches nothing — treated as "empty". */
  readonly notFound: Signal<boolean>;
  readonly hasError: Signal<boolean>;
  goToPage(page: number): void;
  applyFilter(filter: F): void;
  reload(): void;
}

/**
 * Reactive, signal-based list store for any Rick and Morty resource.
 * `httpResource` re-requests automatically when `page` or `filter` change.
 * Must be called from an injection context (e.g. an @Injectable field).
 */
export function createResourceStore<T, F extends StringFilter>(url: string): ResourceStore<T, F> {
  const _page = signal(1);
  const _filter = signal<F>({} as F);

  const activeFilter = computed<Record<string, string>>(() =>
    Object.fromEntries(
      Object.entries(_filter() as Record<string, string | undefined>).filter(
        (entry): entry is [string, string] => entry[1] != null && entry[1] !== '',
      ),
    ),
  );

  const listResource = httpResource<ListResponse<T>>(() => ({
    url,
    params: { page: _page(), ...activeFilter() },
  }));

  // Unfiltered first page, fetched once, only for its total count.
  const totalResource = httpResource<ListResponse<T>>(() => url);

  const errorStatus = computed<number | undefined>(() => {
    const error = listResource.error();
    return error instanceof HttpErrorResponse ? error.status : undefined;
  });

  // Reading `value()` throws in an error state — guard with `hasValue()`.
  const list = computed(() => (listResource.hasValue() ? listResource.value() : undefined));
  const total = computed(() => (totalResource.hasValue() ? totalResource.value() : undefined));

  return {
    page: _page.asReadonly(),
    filter: _filter.asReadonly(),
    items: computed<readonly T[]>(() => list()?.results ?? []),
    pageInfo: computed<PageInfo | undefined>(() => list()?.info),
    filteredCount: computed(() => list()?.info.count ?? 0),
    grandTotal: computed(() => total()?.info.count ?? 0),
    isLoading: listResource.isLoading,
    notFound: computed(() => errorStatus() === 404),
    hasError: computed(() => {
      const status = errorStatus();
      return status !== undefined && status !== 404;
    }),
    goToPage: (page) => _page.set(page),
    applyFilter: (filter) => {
      _filter.set(filter);
      _page.set(1);
    },
    reload: () => listResource.reload(),
  };
}
