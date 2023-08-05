"use strict";
import "../sass/main.scss";
import map from "./components/map.js";
import { renderError } from "./components/modal.js";
import { renderCard } from "./components/renderCard";
import { requestApi } from "./utils/requestApi.js";

(function () {
  const form = document.getElementById("form");
  const inputEl = document.querySelector(".dearch-input");

  setTimeout(() => {
    const myProfile = document.querySelector(".my-profile");
    myProfile.classList.add("hide");
  }, 2000);

  document.addEventListener("DOMContentLoaded", async function () {
    const data = await requestApi("load");
    const mapData = {
      latLon: [data.latitude, data.longitude],
      ip: data.ip,
    };

    map.createMap(mapData);
    renderCard(data);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    inputEl.blur();

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
