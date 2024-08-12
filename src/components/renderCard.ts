"use strict";

import { ApiData } from "../index";

export function renderCard(data: ApiData) {
  const ipAddressEl = document.getElementById("ip-address") as HTMLSpanElement;
  const ipLocationEl = document.getElementById("location") as HTMLSpanElement;
  const ipTimezoneEl = document.getElementById("timezone") as HTMLSpanElement;
  const ipIspEl = document.getElementById("isp") as HTMLSpanElement;

  const keysToExtract: (keyof ApiData)[] = ["city", "region", "country"];
  const extractedValues = Object.entries(data)
    .filter(
      ([key, value]) =>
        keysToExtract.includes(key as keyof ApiData) && value !== null
    )
    .map(([_, value]) => value as string)
    .join(", ");

  const location = `${extractedValues} ${data.zipCode ?? ""}`;

  ipAddressEl.textContent = data.ip ?? "Not found";
  ipLocationEl.textContent = location;
  ipTimezoneEl.textContent = data.timezone ?? "Not found";
  ipIspEl.textContent = data.isp ?? "Not found";
}
