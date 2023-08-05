"use strict";
export function renderCard(data) {
  const inputEl = document.querySelector(".dearch-input");
  const ipAddressEl = document.getElementById("ip-address");
  const ipLocationEl = document.getElementById("location");
  const ipTimezoneEl = document.getElementById("timezone");
  const ipIspEl = document.getElementById("isp");

  const keysToExtract = ["city", "region", "country"];
  const extractedValues = Object.entries(data)
    .filter(([key, value]) => keysToExtract.includes(key) && value !== null)
    .map(([_, value]) => value)
    .join(", ");

  const location = `${extractedValues} ${data.zip ? data.zip : ""}`;

  ipAddressEl.textContent = data.ip ? data.ip : "Not found";
  ipLocationEl.textContent = location;
  ipTimezoneEl.textContent = data.timezone ? data.timezone : "Not found";
  ipIspEl.textContent = data.isp ? data.isp : "Not found";
  inputEl.value = data.ip ? data.ip : "Not found";
}
