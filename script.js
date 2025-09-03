import { maps, routs } from "./maps.js";
const btn = document.getElementById("go_to_map");
const hero = document.querySelector(".hero");
const typesofmaps = document.querySelector(".types_of_maps_container");
const openTypes = document.querySelector(".open_types_of_maps");
const container = document.querySelector(".types_of_maps_container");
const checkboxes = container.querySelectorAll('input[type="checkbox"]');
const churches = routs.map((rout) => {
  return maps[rout].churches;
});

const people = routs.map((rout) => {
  return maps[rout].people;
});
let swiperState = [0];
const polygons = routs.map((rout) => {
  return L.polygon(maps[rout].map, {
    color: "#46C767",
    fillColor: "#46C767",
    fillOpacity: 0.15,
    weight: 2,
  });
});
console.log(polygons);
let typesOfMapsState = {
  borders: true,
  churches: false,
  people: false,
};
let typesOfMapstoggle = true;
btn.addEventListener("click", (e) => {
  console.log("yes");
  hero.style.top = "-120%";
});

const typesDrawer = (state, date) => {
  myGroup.clearLayers();
  if (state.borders) {
    myGroup.addLayer(polygons[date]);
  }
  if (state.churches) {
    churches[date].forEach((c) => {
      myGroup.addLayer(L.marker([c[0], c[1]]).bindPopup(c[2]));
    });
  }
  if (state.people) {
    people[date].forEach((p) => {
      myGroup.addLayer(
        L.marker(p[0])
          .addTo(map)
          .bindPopup(
            `<div class="popup"  style="height: 260px"><h3>${p[1]}</h3><p>${p[2]}<br>${p[3]}</p>
     <img src="${p[4]}" alt="Portrait of Golda Meir" style="width: auto; height: 150px; margin-bottom:8px;"></div>`
          )
          .openPopup()
      );
    });
  }
};

const borderHandler = (state, date) => {
  typesOfMapsState.borders = state;
  typesDrawer(typesOfMapsState, date);
};
const churchesHandler = (state, date) => {
  typesOfMapsState.churches = state;
  typesDrawer(typesOfMapsState, date);
};
const peopleHandler = (state, date) => {
  typesOfMapsState.people = state;
  typesDrawer(typesOfMapsState, date);
};

openTypes.addEventListener("click", (e) => {
  typesOfMapstoggle = !typesOfMapstoggle;
  if (typesOfMapstoggle) {
    typesofmaps.style.top = "0";
    openTypes.style.transform = "rotate(-90deg)";
  }
  if (!typesOfMapstoggle) {
    typesofmaps.style.top = "-135px";
    openTypes.style.transform = "rotate(90deg)";
  }
  console.log(typesOfMapstoggle);
});

container.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    if (e.target.value == "Borders")
      return borderHandler(e.target.checked, swiperState);
    if (e.target.value == "Churches")
      return churchesHandler(e.target.checked, swiperState);
    if (e.target.value == "People")
      return peopleHandler(e.target.checked, swiperState);
  }
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
  minZoom: 4,
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

swiper.on("slideChange", function () {
  swiperState[0] = swiper.activeIndex;
  console.log(swiperState);
  typesDrawer(typesOfMapsState, swiperState);
});
