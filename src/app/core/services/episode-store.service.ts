import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import type { Episode, EpisodeFilter } from '../models/episode.model';
import { createResourceStore } from './resource-store';

/** Reactive, signal-based store for Rick and Morty episode list data. */
@Injectable({ providedIn: 'root' })
export class EpisodeStore {
  private readonly store = createResourceStore<Episode, EpisodeFilter>(
    `${environment.apiBaseUrl}/episode`,
  );

  readonly page = this.store.page;
  readonly filter = this.store.filter;
  readonly episodes = this.store.items;
  readonly pageInfo = this.store.pageInfo;
  readonly totalCount = this.store.filteredCount;
  readonly totalEpisodes = this.store.grandTotal;
  readonly isLoading = this.store.isLoading;
  readonly notFound = this.store.notFound;
  readonly hasError = this.store.hasError;

  goToPage = this.store.goToPage;
  applyFilter = this.store.applyFilter;
  reload = this.store.reload;
}
