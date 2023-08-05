"use strict";
export function formatTimeOffset(seconds) {
  if (!seconds) return "Not found";

  const sign = seconds < 0 ? "-" : "+";
  const absoluteSeconds = Math.abs(seconds);
  const hours = String(Math.floor(absoluteSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((absoluteSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  return `${sign}${hours}:${minutes}`;
}
