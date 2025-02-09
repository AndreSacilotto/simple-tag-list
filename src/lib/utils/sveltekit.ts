import type { Snippet } from "svelte";

export interface PageProps
{
  children?: Snippet;
  [x: string]: unknown;
}

export function sitemap()
{
  const pages = import.meta.glob('/src/routes/**/+page.svelte');
  const routes = Object.keys(pages)
    .reduce((accumulator, x) =>
    {
      let href = x.substring(11, x.length - 13) // remove "/src/routes" prefix & "/+page.svelte" postfix

      if(/\/\[.+\]/.test(href)) // not a [rest] route
        return accumulator;

      href = href.replaceAll(/\/\(.+\)/g, '')  // remove (groups)

      const array = href.split('/');
      array.shift();

      if (array.length === 0)
        href = '/';
      
      accumulator.push({ href, path: array })
      
      return accumulator;
    }, [] as { href: string, path: string[] }[])
    .sort((a, b) => a.href.localeCompare(b.href))
  return routes;
}