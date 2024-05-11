import { Routes } from '@angular/router';
import {CharacterDetailComponent} from "./components/character-detail/character-detail.component";
import {CharactersComponent} from "./components/characters/characters.component";

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: 'characters', component: CharactersComponent },
  { path: 'character/:id', component: CharacterDetailComponent }
];
