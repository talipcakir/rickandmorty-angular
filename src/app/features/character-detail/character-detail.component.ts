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
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { environment } from '../../../environments/environment';
import { CharacterStore } from '../../core/services/character-store.service';
import type { Character } from '../../core/models/character.model';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-character-detail',
  imports: [
    DatePipe,
    NgOptimizedImage,
    MatCardModule,
    MatListModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    PaginationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent {
  private readonly store = inject(CharacterStore);
  private readonly router = inject(Router);

  /** Bound from the `:id` route parameter via `withComponentInputBinding()`. */
  readonly id = input.required({ transform: numberAttribute });

  private readonly resource = httpResource<Character>(
    () => `${environment.apiBaseUrl}/character/${this.id()}`,
  );

  // `resource.value()` throws while in an error state — guard with `hasValue()`.
  readonly character = computed(() =>
    this.resource.hasValue() ? this.resource.value() : undefined,
  );
  readonly isLoading = this.resource.isLoading;
  readonly hasError = computed(() => this.resource.error() != null);
  readonly totalCharacters = this.store.totalCharacters;

  onPageChange(id: number): void {
    void this.router.navigate(['/character', id]);
  }

  retry(): void {
    this.resource.reload();
  }
}
