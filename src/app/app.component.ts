import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./core/components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    HeaderComponent
  ],
  template: `
    <app-header [title]="title"></app-header>
    <router-outlet/>
  `
})
export class AppComponent {
  title = 'The Rick and Morty - Angular Project';
}
