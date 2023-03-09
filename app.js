// map layer
const googleStreets = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
// map icon
const myIcon = L.icon({
  iconUrl: "/images/icon-location.svg",
  iconSize: [40, 60],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: "",
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

let map;
const inputEl = document.querySelector("input[type= 'text']");
const ipAddressEl = document.querySelector(".ip");
const locationEl = document.querySelector(".location");
const timezoneEl = document.querySelector(".timezone");
const ispEl = document.querySelector(".isp");
const submitBtn = document.querySelector(".submit");
const resultBox = document.querySelector(".result");

// event listener
window.addEventListener("DOMContentLoaded", () => {
  renderUserSearchResult();
  renderMap();
});

submitBtn.addEventListener("click", renderUserSearchResult);
window.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    renderUserSearchResult();
  }
});

// function

function renderMap(x = 34.04915, y = -118.09462) {
  map = L.map("map").setView([x, y], 13);
  googleStreets.addTo(map);
  L.marker([x, y], { icon: myIcon }).addTo(map);
}

function renderUserSearchResult() {
  const userInput = inputEl.value;

  // fetch data if input box isn't empty
  if (userInput) {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_fugKaXsYHQa25CDw9tqJIVAeve5w3&ipAddress= ${userInput}`;

    fetchData(url);

    inputEl.value = "";
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  // render search result on user interface
  renderSearchResult(data);
}

function renderSearchResult(data) {
  ipAddressEl.innerHTML = data.ip;
  locationEl.innerHTML = data.location.city;
  ispEl.innerHTML = data.isp;
  timezoneEl.innerHTML = `UTC${data.location.timezone}`;

  const lat = data.location.lat;
  const lng = data.location.lng;

  map = map.remove();
  renderMap(lat, lng);
}
