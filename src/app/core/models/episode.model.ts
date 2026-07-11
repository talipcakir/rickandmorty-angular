import type { ListResponse } from './list-response.model';

/** A single Rick and Morty episode. */
export interface Episode {
  readonly id: number;
  readonly name: string;
  readonly air_date: string;
  /** Episode code, e.g. "S01E01". */
  readonly episode: string;
  /** Character endpoint URLs for characters appearing in this episode. */
  readonly characters: readonly string[];
  readonly url: string;
  readonly created: string;
}

/** Query parameters accepted by the `/episode` list endpoint. */
export interface EpisodeFilter {
  name?: string;
  /** Episode code, e.g. "S01E01". */
  episode?: string;
}

export type EpisodeListResponse = ListResponse<Episode>;
