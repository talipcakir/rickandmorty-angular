import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CharacterStore } from '../../core/services/character-store.service';
import type { CharacterFilter } from '../../core/models/character-filter.model';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';
import { CharacterFilterComponent } from '../../shared/components/character-filter/character-filter.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-characters',
  imports: [
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    CharacterCardComponent,
    CharacterFilterComponent,
    PaginationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent {
  private readonly store = inject(CharacterStore);

  readonly characters = this.store.characters;
  readonly isLoading = this.store.isLoading;
  readonly notFound = this.store.notFound;
  readonly hasError = this.store.hasError;
  readonly totalCount = this.store.totalCount;
  readonly page = this.store.page;

  onFilterChange(filter: CharacterFilter): void {
    this.store.applyFilter(filter);
  }

  onPageChange(page: number): void {
    this.store.goToPage(page);
  }

  retry(): void {
    this.store.reload();
  }
}
