"use strict";
import "./sass/main.scss";
import map from "./components/map";
import { renderError } from "./components/modal";
import { renderCard } from "./components/renderCard";
import { requestApi } from "./utils/requestApi";

(function () {
  const form = document.getElementById("form");
  const inputEl = document.querySelector(".dearch-input");

  document.addEventListener("DOMContentLoaded", async function () {
    const data = await requestApi("load");
    const mapData = {
      latLon: [data.latitude, data.longitude],
      ip: data.ip,
    };

    map.createMap(mapData);
    renderCard(data);
  });

  let preValue;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    inputEl.blur();
    const { value } = inputEl;

    if (preValue === value) return;

    preValue = value;
    renderData(value);
    inputEl.value = "";
  });

  async function renderData(input) {
    try {
      const data = await requestApi(input);

      const mapData = {
        latLon: [data.latitude, data.longitude],
        ip: data.ip,
      };

      map.flyingTo(mapData);
      renderCard(data);
    } catch (error) {
      renderError(error);
    }
  }
})();
