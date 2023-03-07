// variables

// event listener
window.addEventListener("DOMContentLoaded", () => {
  mapInit();
});

// function

function mapInit() {
  const map = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([51.5, -0.09]).addTo(map);

  const leafletMarker = document.querySelector(".leaflet-marker-pane img");

  // change maker img
  leafletMarker.src = "/images/icon-location.svg";
}

const url = `https://geo.ipify.org/api/v2/country?apiKey=at_fugKaXsYHQa25CDw9tqJIVAeve5w3&ipAddress=8.8.8.8`;

fetch(url)
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });
