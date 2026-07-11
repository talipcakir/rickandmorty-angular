import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { environment } from '../../../environments/environment';
import { EpisodeStore } from '../../core/services/episode-store.service';
import type { Character } from '../../core/models/character.model';
import type { Episode } from '../../core/models/episode.model';
import { idsFromUrls } from '../../core/services/api-url.util';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-episode-detail',
  imports: [
    DatePipe,
    MatCardModule,
    MatListModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    CharacterCardComponent,
    PaginationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.scss',
})
export class EpisodeDetailComponent {
  private readonly store = inject(EpisodeStore);
  private readonly router = inject(Router);

  /** Bound from the `:id` route parameter via `withComponentInputBinding()`. */
  readonly id = input.required({ transform: numberAttribute });

  private readonly resource = httpResource<Episode>(
    () => `${environment.apiBaseUrl}/episode/${this.id()}`,
  );

  // `resource.value()` throws while in an error state — guard with `hasValue()`.
  readonly episode = computed(() =>
    this.resource.hasValue() ? this.resource.value() : undefined,
  );
  readonly isLoading = this.resource.isLoading;
  readonly hasError = computed(() => this.resource.error() != null);
  readonly totalEpisodes = this.store.totalEpisodes;

  // ---- Enrichment: characters appearing in this episode --------------------
  private readonly castResource = httpResource<Character[] | Character>(() => {
    const ep = this.episode();
    if (!ep || ep.characters.length === 0) return undefined;
    return `${environment.apiBaseUrl}/character/${idsFromUrls(ep.characters)}`;
  });
  readonly cast = computed<readonly Character[]>(() => {
    if (!this.castResource.hasValue()) return [];
    const v = this.castResource.value();
    return Array.isArray(v) ? v : [v];
  });

  onPageChange(id: number): void {
    void this.router.navigate(['/episode', id]);
  }

  retry(): void {
    this.resource.reload();
  }
}
