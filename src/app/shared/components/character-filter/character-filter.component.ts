import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import type { CharacterFilter } from '../../../core/models/character-filter.model';
import { CHARACTER_GENDERS, CHARACTER_STATUSES } from '../../../core/models/character-filter.model';

@Component({
  selector: 'app-character-filter',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './character-filter.component.html',
  styleUrl: './character-filter.component.scss',
})
export class CharacterFilterComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly filterChange = output<CharacterFilter>();

  readonly statuses = CHARACTER_STATUSES;
  readonly genders = CHARACTER_GENDERS;

  readonly form = this.fb.group({
    name: this.fb.control('', Validators.minLength(3)),
    species: this.fb.control('', Validators.minLength(3)),
    type: this.fb.control('', Validators.minLength(3)),
    status: this.fb.control(''),
    gender: this.fb.control(''),
  });

  constructor() {
    this.form.valueChanges
      .pipe(
        debounceTime(400),
        filter(() => this.form.valid),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.filterChange.emit(this.form.getRawValue()));
  }

  reset(): void {
    this.form.reset();
  }
}
