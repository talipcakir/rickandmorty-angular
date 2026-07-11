import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import type { Location } from '../../../core/models/location.model';

@Component({
  selector: 'app-location-card',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss',
})
export class LocationCardComponent {
  readonly location = input.required<Location>();
}
