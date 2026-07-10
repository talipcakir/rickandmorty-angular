import type { CharacterGender, CharacterStatus } from './character.model';

/** Query parameters accepted by the `/character` list endpoint. */
export interface CharacterFilter {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

export const CHARACTER_STATUSES: readonly CharacterStatus[] = ['Alive', 'Dead', 'unknown'];

export const CHARACTER_GENDERS: readonly CharacterGender[] = [
  'Female',
  'Male',
  'Genderless',
  'unknown',
];
