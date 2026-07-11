import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { EpisodeStore } from '../../core/services/episode-store.service';
import type { EpisodeFilter } from '../../core/models/episode.model';
import { EpisodeCardComponent } from '../../shared/components/episode-card/episode-card.component';
import { EpisodeFilterComponent } from '../../shared/components/episode-filter/episode-filter.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-episodes',
  imports: [
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    EpisodeCardComponent,
    EpisodeFilterComponent,
    PaginationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss',
})
export class EpisodesComponent {
  private readonly store = inject(EpisodeStore);

  readonly episodes = this.store.episodes;
  readonly isLoading = this.store.isLoading;
  readonly notFound = this.store.notFound;
  readonly hasError = this.store.hasError;
  readonly totalCount = this.store.totalCount;
  readonly page = this.store.page;

  onFilterChange(filter: EpisodeFilter): void {
    this.store.applyFilter(filter);
  }

  onPageChange(page: number): void {
    this.store.goToPage(page);
  }

  retry(): void {
    this.store.reload();
  }
}
