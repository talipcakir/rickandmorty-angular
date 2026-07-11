/** Pagination metadata returned alongside every list endpoint. */
export interface PageInfo {
  readonly count: number;
  readonly pages: number;
  readonly next: string | null;
  readonly prev: string | null;
}

/** Generic shape of any `/{resource}` list endpoint response. */
export interface ListResponse<T> {
  readonly info: PageInfo;
  readonly results: readonly T[];
}
