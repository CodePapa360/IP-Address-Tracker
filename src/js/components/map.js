import L from "leaflet";

class Map {
  #map = null;

  createMap(data) {
    const viewLatlon = [data.latLon[0] + 0.015, data.latLon[1]];

    this.#map = L.map("map").setView(viewLatlon, 13);
    var myIcon = L.icon({
      iconUrl: require("../../images/icon-location.svg"),
      iconSize: [46, 56],
      iconAnchor: [32, 55],
      popupAnchor: [-10, -50],
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.marker = L.marker(data.latLon, { icon: myIcon })
      .addTo(this.#map)
      .bindPopup(data.ip)
      .openPopup();
  }

  flyingTo(data) {
    this.waitForMapReady(this.#map).then(() => {
      setTimeout(() => {
        const viewLatlon = [data.latLon[0] + 0.015, data.latLon[1]];

        this.#map.flyTo(viewLatlon, 13, {
          duration: 2,
          easeLinearity: 0.25,
        });

        this.#map.marker.setLatLng(data.latLon).bindPopup(data.ip).openPopup();
      }, 100);
    });
  }

  waitForMapReady(map) {
    return new Promise((resolve) => {
      if (map._loaded) {
        resolve();
      } else {
        map.whenReady(resolve);
      }
    });
  }
}

export default new Map();
