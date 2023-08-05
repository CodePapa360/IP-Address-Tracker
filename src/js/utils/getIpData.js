"use strict";
import { formatTimeOffset } from "./formatTimeOffset.js";

export async function getIpData(value) {
  try {
    const key = process.env.IP_API_KEY;
    const url = `https://api.ipdata.co/${value}?api-key=${key}`;

    const data = await fetch(url).then((res) => res.json());

    const dataObj = {
      ip: data.ip,
      isp: data.asn.name,
      city: data.city,
      region: data.region,
      country: data.country_name,
      timezone: formatTimeOffset(data.time_zone.offset),
      zipCode: data.postal,
      latitude: data.latitude,
      longitude: data.longitude,
    };

    return dataObj;
  } catch (err) {
    throw new Error("Something went wrong fetching the data!");
  }
}
