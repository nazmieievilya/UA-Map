import { maps, routs } from "./maps.js";
const btn = document.getElementById("go_to_map");
const hero = document.querySelector(".hero");
btn.addEventListener("click", (e) => {
  console.log("yes");
  hero.style.top = "-120%";
});
// Set current year
document.getElementById("year").textContent = new Date().getFullYear();
console.log(maps);

const key = "40ctAjlYbSwks22PprOn";
// Initialize map centered on Ukraine
const map = L.map("map", {
  center: [48.5, 31.5],
  zoom: 4,
  maxBounds: [
    [35, 15], // юго-западная точка (примерно)
    [60, 50], // северо-восточная точка (примерно)
  ],
  maxBoundsViscosity: 0, // prevent dragging outside
});

// Tile layer: Before the war
const beforeWar = L.maptiler
  .maptilerLayer({
    apiKey: key,
    style:
      "https://api.maptiler.com/maps/0198e5cb-be54-7f3f-9367-1d8ff1db14d6/style.json?key=40ctAjlYbSwks22PprOn", //optional
  })
  .addTo(map);

// Tile layer: Current map (example HOT style)

// Layer control to switch maps
const myGroup = L.layerGroup().addTo(map);
const myPolygon1 = L.polygon(maps.from988to1240.map, {
  color: "#46C767",
  fillColor: "#46C767",
  fillOpacity: 0.15,
  weight: 2,
});
myGroup.addLayer(myPolygon1);

const drawnFeatures = new L.FeatureGroup();
map.addLayer(drawnFeatures);
map.on("draw:created", function (e) {
  console.log(e);
});
let swiperState = [0, 0];
const swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".button_left",
    prevEl: ".button_right",
  },
});

const swiper2 = new Swiper(".mySwiper2", {
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".button_up",
    prevEl: ".button_down",
  },
});

const swiper3 = new Swiper(".mySwiper3", {
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".button_up",
    prevEl: ".button_down",
  },
});
const polygons = routs.map((rout) => {
  return L.polygon(maps[rout].map, {
    color: "#46C767",
    fillColor: "#46C767",
    fillOpacity: 0.15,
    weight: 2,
  });
});
const churches = routs.map((rout) => {
  return maps[rout].churches;
});
swiper.on("slideChange", function () {
  swiperState[0] = swiper.activeIndex;
  console.log(swiperState);
  myGroup.clearLayers();
  if (swiperState[1] == 0) {
    myGroup.addLayer(polygons[swiperState[0]]);
  }
  if (swiperState[1] == 1) {
    churches[swiperState[0]].forEach((coord) => {
      const marker = L.marker([coord[0], coord[1]]);
      myGroup.addLayer(marker);
    });
  }
});
swiper2.on("slideChange", function () {
  swiperState[1] = swiper2.activeIndex;
  console.log(swiperState);
  myGroup.clearLayers();
  if (swiperState[1] == 0) {
    myGroup.addLayer(polygons[swiperState[0]]);
  }
  if (swiperState[1] == 1) {
    churches[swiperState[0]].forEach((coord) => {
      const marker = L.marker([coord[0], coord[1]]);
      myGroup.addLayer(marker);
    });
  }
});

swiper2.controller.control = [swiper3];
swiper3.controller.control = [swiper2];
