import { Routes } from '@angular/router';

const SUFFIX = ' · Rick and Morty Explorer';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  {
    path: 'characters',
    title: `Characters${SUFFIX}`,
    loadComponent: () =>
      import('./features/characters/characters.component').then((m) => m.CharactersComponent),
  },
  {
    path: 'character/:id',
    title: `Character${SUFFIX}`,
    loadComponent: () =>
      import('./features/character-detail/character-detail.component').then(
        (m) => m.CharacterDetailComponent,
      ),
  },
  {
    path: 'locations',
    title: `Locations${SUFFIX}`,
    loadComponent: () =>
      import('./features/locations/locations.component').then((m) => m.LocationsComponent),
  },
  {
    path: 'location/:id',
    title: `Location${SUFFIX}`,
    loadComponent: () =>
      import('./features/location-detail/location-detail.component').then(
        (m) => m.LocationDetailComponent,
      ),
  },
  {
    path: 'episodes',
    title: `Episodes${SUFFIX}`,
    loadComponent: () =>
      import('./features/episodes/episodes.component').then((m) => m.EpisodesComponent),
  },
  {
    path: 'episode/:id',
    title: `Episode${SUFFIX}`,
    loadComponent: () =>
      import('./features/episode-detail/episode-detail.component').then(
        (m) => m.EpisodeDetailComponent,
      ),
  },
  { path: '**', redirectTo: 'characters' },
];
