export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

/** A named reference to another API resource (origin, last known location, ...). */
export interface ResourceRef {
  readonly name: string;
  readonly url: string;
}

/** A single Rick and Morty character. */
export interface Character {
  readonly id: number;
  readonly name: string;
  readonly status: CharacterStatus;
  readonly species: string;
  readonly type: string;
  readonly gender: CharacterGender;
  readonly origin: ResourceRef;
  readonly location: ResourceRef;
  readonly image: string;
  readonly episode: readonly string[];
  readonly url: string;
  readonly created: string;
}

/** Pagination metadata returned alongside a list of characters. */
export interface PageInfo {
  readonly count: number;
  readonly pages: number;
  readonly next: string | null;
  readonly prev: string | null;
}

/** Shape of the `/character` list endpoint response. */
export interface CharacterListResponse {
  readonly info: PageInfo;
  readonly results: readonly Character[];
}
