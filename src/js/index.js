"use strict";
import "../sass/main.scss";

const inputEl = document.querySelector(".dearch-input");
const btnSubmit = document.querySelector(".btn-submit");
const mapContainer = document.querySelector(".map-container");

const ipAddressEl = document.getElementById("ip-address");
const ipLocationEl = document.getElementById("location");
const ipTimezoneEl = document.getElementById("timezone");
const ipIspEl = document.getElementById("isp");

function isValidDomain(url) {
  const domainRegex =
    /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\/?/;
  const match = url.match(domainRegex);

  return match && match[1] ? match[1] : false;
}

function isValidIPv4Address(ip) {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip) ? ip : false;
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
  const url = `https://api.ipbase.com/v2/info?apikey=ipb_live_ScLMil3VvkHx2KxiRQPpSut9FMZ6MQCfs5WN0vW2&ip=${value}`;

  const { data } = await fetch(url).then((res) => res.json());

  const dataObj = {
    ip: data.ip,
    isp: data.connection.isp,
    city: data.location.city.name,
    region: data.location.region.name,
    country: data.location.country.name,
    timezone: formatTimeOffset(data.timezone.gmt_offset),
    zipCode: data.location.zip,
    latitude: data.location.latitude,
    longitude: data.location.longitude,
  };

  return dataObj;
}

async function getDomainData(value) {
  const key = "at_b5kLCsPUpTBodLQqaK8wrEXyfS3iE";
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
}

const callApi = async function (value) {
  try {
    const ip = isValidIPv4Address(value);
    const domain = isValidDomain(value);

    if (ip) {
      return getIpData(ip);
    }

    if (domain) {
      return getDomainData(domain);
    }
  } catch (err) {
    console.log(err);
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

const setMap = function (latLon) {
  if (!map) {
    map = L.map("map").setView(latLon, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Remove the existing marker (if any) and create a new one at the specified latLon
    map.marker = L.marker(latLon)
      .addTo(map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup();
  } else {
    waitForMapReady(map).then(() => {
      setTimeout(() => {
        map.flyTo(latLon, 16, {
          duration: 2, // Adjust the duration (in seconds) as needed
          easeLinearity: 0.25, // Adjust the easing value as needed
        });

        // Update the marker position after the flyTo animation is completed
        map.marker.setLatLng(latLon);
      }, 100); // Use a small delay to ensure the map is fully loaded
    });
  }
};

//
const renderCard = function (data) {
  const location = `${data.city}, ${data.region}, ${data.country} ${data.zip}`;

  ipAddressEl.textContent = data.ip;
  ipLocationEl.textContent = location;
  ipTimezoneEl.textContent = data.timezone;
  ipIspEl.textContent = data.isp;
  inputEl.value = data.ip;
};

//render
btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  const { value } = inputEl;
  renderData(value);
});

const renderData = async function (input) {
  const data = await callApi(input);
  const latLon = [data.latitude, data.longitude];

  setMap(latLon, 13);

  renderCard(data);
};

const load = await getIpData("");
const latLon = [load.latitude, load.longitude];

setMap(latLon, 13);
renderCard(load);
