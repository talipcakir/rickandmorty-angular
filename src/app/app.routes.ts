import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  {
    path: 'characters',
    title: 'Characters · Rick and Morty Explorer',
    loadComponent: () =>
      import('./features/characters/characters.component').then((m) => m.CharactersComponent),
  },
  {
    path: 'character/:id',
    title: 'Character · Rick and Morty Explorer',
    loadComponent: () =>
      import('./features/character-detail/character-detail.component').then(
        (m) => m.CharacterDetailComponent,
      ),
  },
  { path: '**', redirectTo: 'characters' },
];
