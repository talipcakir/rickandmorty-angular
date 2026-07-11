import type { ListResponse } from './list-response.model';

/** A single Rick and Morty location. */
export interface Location {
  readonly id: number;
  readonly name: string;
  readonly type: string;
  readonly dimension: string;
  /** Character endpoint URLs for the location's residents. */
  readonly residents: readonly string[];
  readonly url: string;
  readonly created: string;
}

/** Query parameters accepted by the `/location` list endpoint. */
export interface LocationFilter {
  name?: string;
  type?: string;
  dimension?: string;
}

export type LocationListResponse = ListResponse<Location>;
