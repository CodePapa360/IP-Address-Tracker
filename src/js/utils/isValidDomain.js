"use strict";
export function isValidDomain(url) {
  const domainRegex =
    /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\/?/;
  const match = url.match(domainRegex);

  if (match) {
    return match[1];
  } else {
    return false;
  }
}
