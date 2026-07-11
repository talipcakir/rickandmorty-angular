import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);

  readonly title = input.required<string>();
  readonly theme = this.themeService.theme;

  readonly links = [
    { path: '/characters', label: 'Characters', icon: 'people' },
    { path: '/locations', label: 'Locations', icon: 'public' },
    { path: '/episodes', label: 'Episodes', icon: 'movie' },
  ];

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
