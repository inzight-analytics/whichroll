/** Prefix a site-root path with Astro's configured base (e.g. `/whichroll/`). */
export function withBase(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}
