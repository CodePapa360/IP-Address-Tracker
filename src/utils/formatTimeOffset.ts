"use strict";
export function formatTimeOffset(seconds: string | null): string | null {
  if (seconds === null) return null;
  const sign = seconds.slice(0, 1);
  const hours = seconds.slice(1, 3);
  const minutes = seconds.slice(3);

  return `${sign}${hours}:${minutes}`;
}
