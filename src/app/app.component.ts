import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header [title]="title" />
    <main>
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  protected readonly title = 'Rick and Morty Explorer';
}
