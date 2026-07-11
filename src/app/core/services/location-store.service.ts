import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import type { Location, LocationFilter } from '../models/location.model';
import { createResourceStore } from './resource-store';

/** Reactive, signal-based store for Rick and Morty location list data. */
@Injectable({ providedIn: 'root' })
export class LocationStore {
  private readonly store = createResourceStore<Location, LocationFilter>(
    `${environment.apiBaseUrl}/location`,
  );

  readonly page = this.store.page;
  readonly filter = this.store.filter;
  readonly locations = this.store.items;
  readonly pageInfo = this.store.pageInfo;
  readonly totalCount = this.store.filteredCount;
  readonly totalLocations = this.store.grandTotal;
  readonly isLoading = this.store.isLoading;
  readonly notFound = this.store.notFound;
  readonly hasError = this.store.hasError;

  goToPage = this.store.goToPage;
  applyFilter = this.store.applyFilter;
  reload = this.store.reload;
}
