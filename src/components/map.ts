import L, { Map as LeafletMap, LatLngExpression, Marker } from "leaflet";
import { MapData } from "../index";

class Map {
  #map: LeafletMap | undefined;
  #marker: Marker | undefined;

  createMap(data: MapData): void {
    const viewLatlon: LatLngExpression = [
      data.latLon[0] + 0.015,
      data.latLon[1],
    ];

    this.#map = L.map("map").setView(viewLatlon, 13);
    var myIcon = L.icon({
      iconUrl: require("../images/icon-location.svg"),
      iconSize: [46, 56],
      iconAnchor: [32, 55],
      popupAnchor: [-10, -50],
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#marker = L.marker(data.latLon, { icon: myIcon })
      .addTo(this.#map)
      .bindPopup(data.isp)
      .openPopup();
  }

  flyingTo(data: MapData): void {
    if (!this.#map || !this.#marker) return;
    const viewLatlon: LatLngExpression = [
      data.latLon[0] + 0.015,
      data.latLon[1],
    ];

    this.#map.flyTo(viewLatlon, 13, {
      duration: 3,
      easeLinearity: 0.1,
    });

    this.#marker.setLatLng(data.latLon).bindPopup(data.isp).openPopup();
  }
}

export default new Map();
