/**
 * The API links resources by URL (e.g. ".../character/42"). These helpers pull
 * the trailing numeric id back out so we can build router links and batched
 * ".../resource/1,2,3" requests.
 */

/** Extract the trailing numeric id from a resource URL. Returns 0 if none. */
export function idFromUrl(url: string): number {
  return Number(url.split('/').pop()) || 0;
}

/** Comma-joined ids for a batch request, e.g. "1,2,3". */
export function idsFromUrls(urls: readonly string[]): string {
  return urls.map(idFromUrl).join(',');
}
