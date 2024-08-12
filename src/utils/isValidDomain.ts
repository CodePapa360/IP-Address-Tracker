"use strict";
export function isValidDomain(url: string): boolean {
  const domainRegex =
    /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\/?/;
  const match = url.match(domainRegex);

  return match !== null;
}
