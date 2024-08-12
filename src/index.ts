"use strict";
import "./sass/main.scss";
import map from "./components/map";
import { renderError } from "./components/modal";
import { renderCard } from "./components/renderCard";
import { requestApi } from "./utils/requestApi";
import { getIpData } from "./utils/getIpData";

export interface MapData {
  latLon: [number, number];
  isp: string;
}

export interface ApiData {
  ip: string;
  isp: string;
  city: string;
  region: string;
  country: string;
  timezone: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

(function () {
  const form = document.getElementById("form") as HTMLFormElement | null;
  const inputEl = document.querySelector(
    ".search-input"
  ) as HTMLInputElement | null;

  document.addEventListener("DOMContentLoaded", async function () {
    const data: ApiData = await getIpData();

    const mapData: MapData = {
      latLon: [data.latitude, data.longitude],
      isp: data.isp,
    };

    map.createMap(mapData);
    renderCard(data);
  });

  let preValue: string = "";

  form?.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!inputEl?.value) return;

    const { value } = inputEl;

    if (preValue === value) return;
    preValue = value;

    renderData(value);

    inputEl.value = "";
  });

  async function renderData(input: string) {
    try {
      const data: ApiData = await requestApi(input);

      const mapData: MapData = {
        latLon: [data.latitude, data.longitude],
        isp: data.isp,
      };

      map.flyingTo(mapData);
      renderCard(data);
    } catch (error) {
      renderError(error);
    }
  }
})();
