import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import type { LocationFilter } from '../../../core/models/location.model';

@Component({
  selector: 'app-location-filter',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './location-filter.component.html',
  styleUrl: './location-filter.component.scss',
})
export class LocationFilterComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly filterChange = output<LocationFilter>();

  readonly form = this.fb.group({
    name: this.fb.control('', Validators.minLength(3)),
    type: this.fb.control('', Validators.minLength(3)),
    dimension: this.fb.control('', Validators.minLength(3)),
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
