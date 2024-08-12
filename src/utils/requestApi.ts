"use strict";
import { isValidDomain } from "./isValidDomain";
import { isValidIPv4Address } from "./isValidIPv4Address";
import { getDomainData } from "./getDomainData";
import { getIpData } from "./getIpData";

export function requestApi(value) {
  if (value === "load") return getIpData("");

  const ip = isValidIPv4Address(value);
  const domain = isValidDomain(value);

  if (!ip && !domain) throw new Error("Please input a valid IP/Domain!");

  if (ip) {
    return getIpData(ip);
  }

  if (domain) {
    return getDomainData(domain);
  }
}
