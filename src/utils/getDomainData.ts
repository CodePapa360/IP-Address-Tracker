"use strict";

import { ApiData } from "../index";

export async function getDomainData(value: string): Promise<ApiData> {
  try {
    const key = process.env.DOMAIN_API_KEY;
    const url = `https://geo.ipify.org/api/v1?apiKey=${key}&domain=${value}`;

    const data = await fetch(url).then((res) => res.json());

    const dataObj: ApiData = {
      ip: data.ip,
      isp: data.isp,
      city: data.location.city,
      region: data.location.region,
      country: data.location.country,
      timezone: data.location.timezone,
      zipCode: data.location.postalCode,
      latitude: data.location.lat,
      longitude: data.location.lng,
    };

    return dataObj;
  } catch (err) {
    throw new Error("Something went wrong while fetching data!");
  }
}
