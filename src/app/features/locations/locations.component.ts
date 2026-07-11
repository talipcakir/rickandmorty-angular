import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LocationStore } from '../../core/services/location-store.service';
import type { LocationFilter } from '../../core/models/location.model';
import { LocationCardComponent } from '../../shared/components/location-card/location-card.component';
import { LocationFilterComponent } from '../../shared/components/location-filter/location-filter.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-locations',
  imports: [
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    LocationCardComponent,
    LocationFilterComponent,
    PaginationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
})
export class LocationsComponent {
  private readonly store = inject(LocationStore);

  readonly locations = this.store.locations;
  readonly isLoading = this.store.isLoading;
  readonly notFound = this.store.notFound;
  readonly hasError = this.store.hasError;
  readonly totalCount = this.store.totalCount;
  readonly page = this.store.page;

  onFilterChange(filter: LocationFilter): void {
    this.store.applyFilter(filter);
  }

  onPageChange(page: number): void {
    this.store.goToPage(page);
  }

  retry(): void {
    this.store.reload();
  }
}
