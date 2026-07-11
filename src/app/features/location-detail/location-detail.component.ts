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
import { LocationStore } from '../../core/services/location-store.service';
import type { Location } from '../../core/models/location.model';
import type { Character } from '../../core/models/character.model';
import { idsFromUrls } from '../../core/services/api-url.util';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-location-detail',
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
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.scss',
})
export class LocationDetailComponent {
  private readonly store = inject(LocationStore);
  private readonly router = inject(Router);

  /** Bound from the `:id` route parameter via `withComponentInputBinding()`. */
  readonly id = input.required({ transform: numberAttribute });

  private readonly resource = httpResource<Location>(
    () => `${environment.apiBaseUrl}/location/${this.id()}`,
  );

  // `resource.value()` throws while in an error state — guard with `hasValue()`.
  readonly location = computed(() =>
    this.resource.hasValue() ? this.resource.value() : undefined,
  );
  readonly isLoading = this.resource.isLoading;
  readonly hasError = computed(() => this.resource.error() != null);
  readonly totalLocations = this.store.totalLocations;

  // ---- Enrichment: residents of this location -----------------------------
  private readonly residentsResource = httpResource<Character[] | Character>(() => {
    const loc = this.location();
    if (!loc || loc.residents.length === 0) return undefined;
    return `${environment.apiBaseUrl}/character/${idsFromUrls(loc.residents)}`;
  });
  readonly residents = computed<readonly Character[]>(() => {
    if (!this.residentsResource.hasValue()) return [];
    const value = this.residentsResource.value();
    return Array.isArray(value) ? value : [value];
  });

  onPageChange(id: number): void {
    void this.router.navigate(['/location', id]);
  }

  retry(): void {
    this.resource.reload();
  }
}
