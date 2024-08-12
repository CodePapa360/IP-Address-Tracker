"use strict";
import { isValidDomain } from "./isValidDomain";
import { isValidIPv4Address } from "./isValidIPv4Address";
import { getDomainData } from "./getDomainData";
import { getIpData } from "./getIpData";
import { ApiData } from "../index";

export function requestApi(value: string): Promise<ApiData> {
  const ip = isValidIPv4Address(value);
  const domain = isValidDomain(value);

  if (!ip && !domain) throw new Error("Please input a valid IP/Domain!");

  if (ip) return getIpData(value);

  if (domain) return getDomainData(value);

  throw new Error("Something went wrong while fetching data!");
}
