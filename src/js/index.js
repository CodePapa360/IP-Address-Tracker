"use strict";
import "../sass/main.scss";
import map from "./components/map.js";
import { renderError } from "./components/modal.js";
import { renderCard } from "./components/renderCard";
import { requestApi } from "./utils/requestApi.js";

(function () {
  const btnSubmit = document.querySelector(".btn-submit");
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

  btnSubmit.addEventListener("click", function (event) {
    event.preventDefault();

    const { value } = inputEl;
    renderData(value);
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
