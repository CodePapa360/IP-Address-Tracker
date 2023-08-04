"use strict";
import "../sass/main.scss";

const inputEl = document.querySelector(".dearch-input");
const btnSubmit = document.querySelector(".btn-submit");
const mapContainer = document.querySelector(".map-container");

const ipAddressEl = document.getElementById("ip-address");
const ipLocationEl = document.getElementById("location");
const ipTimezoneEl = document.getElementById("timezone");
const ipIspEl = document.getElementById("isp");

///modal
const renderModal = function (message) {
  const modal = document.querySelector(".modal");
  const msgEl = modal.querySelector(".error-message");
  const btnModalClose = modal.querySelector(".btn-modal-close");
  const body = document.querySelector("body");

  msgEl.textContent = message;

  modal.classList.add("show");
  body.style.overflow = "hidden";

  btnModalClose.addEventListener("click", function () {
    modal.classList.remove("show");
    body.style.overflow = "auto";
  });
};

function isValidDomain(url) {
  const domainRegex =
    /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\/?/;
  const match = url.match(domainRegex);

  if (match) {
    return match[1];
  } else {
    return false;
  }
}

function isValidIPv4Address(ip) {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  const test = ipv4Regex.test(ip);
  return test ? ip : false;
}

function formatTimeOffset(seconds) {
  const sign = seconds < 0 ? "-" : "+";
  const absoluteSeconds = Math.abs(seconds);
  const hours = String(Math.floor(absoluteSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((absoluteSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  return `${sign}${hours}:${minutes}`;
}

async function getIpData(value) {
  try {
    const key = process.env.ApiIpData;
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

async function getDomainData(value) {
  try {
    const key = process.env.Domainkey;
    const url = `https://geo.ipify.org/api/v1?apiKey=${key}&domain=${value}`;

    const data = await fetch(url).then((res) => res.json());

    const dataObj = {
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
    throw new Error("Something went wrong fetching the data!");
  }
}

const callApi = function (value) {
  const ip = isValidIPv4Address(value);
  const domain = isValidDomain(value);

  if (!ip && !domain) throw new Error("Please input a valid IP/Domain!");

  if (ip) {
    return getIpData(ip);
  }

  if (domain) {
    return getDomainData(domain);
  }
};

///////////
//map
var map = null;

function waitForMapReady(map) {
  return new Promise((resolve) => {
    if (map._loaded) {
      resolve();
    } else {
      map.whenReady(resolve);
    }
  });
}

const setMap = function (latLon, ip) {
  if (!map) {
    map = L.map("map").setView(latLon, 13);
    var myIcon = L.icon({
      iconUrl: require("../images/icon-location.svg"),
      iconSize: [46, 56],
      iconAnchor: [32, 55],
      popupAnchor: [-10, -50],
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.marker = L.marker(latLon, { icon: myIcon })
      .addTo(map)
      .bindPopup(ip)
      .openPopup();
  } else {
    waitForMapReady(map).then(() => {
      setTimeout(() => {
        map.flyTo(latLon, 16, {
          duration: 2,
          easeLinearity: 0.25,
        });

        map.marker.setLatLng(latLon).bindPopup(ip).openPopup();
      }, 200);
    });
  }
};

//
const renderCard = function (data) {
  const location = `${data.city ? data.city : ""}, ${
    data.region ? data.region : ""
  }, ${data.country} ${data.zip ? data.zip : ""}`;

  ipAddressEl.textContent = data.ip ? data.ip : "Not found";
  ipLocationEl.textContent = location;
  ipTimezoneEl.textContent = data.timezone ? data.timezone : "Not found";
  ipIspEl.textContent = data.isp ? data.isp : "Not found";
  inputEl.value = data.ip ? data.ip : "Not found";
};

//render
btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  const { value } = inputEl;
  renderData(value);
});

const renderData = async function (input) {
  try {
    const data = await callApi(input);

    const latLon = [data.latitude, data.longitude];

    setMap(latLon, data.ip);

    renderCard(data);
  } catch (error) {
    renderModal(error);
  }
};

const load = await getIpData("");
const latLon = [load.latitude, load.longitude];

setMap(latLon, load.ip);
renderCard(load);
