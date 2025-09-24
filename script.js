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

const ortodoxcross = L.icon({
  iconUrl: "./orthodoxcross.png",

  iconSize: [30], // size of the icon
  iconAnchor: [15, 0], // point of the icon which will correspond to marker's location
  popupAnchor: [-5, 0], // point from which the popup should open relative to the iconAnchor
});
const catholiccross = L.icon({
  iconUrl: "./catholiccross.png",

  iconSize: [20, 22], // size of the icon
  iconAnchor: [0], // point of the icon which will correspond to marker's location
  popupAnchor: [10, 0], // point from which the popup should open relative to the iconAnchor
});

const freedomOverlayDrawer = (src, bounds) =>
  L.imageOverlay(src, bounds, {
    opacity: 0.8,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
  });

var imageUrl = "./dialects.png";
var imageFreedom = "./germany freedom.png";
var imageFreedomZaporizia = "./zaporizhia.png";
var errorOverlayUrl = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
var altText =
  "Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.";
var latLngBounds = L.latLngBounds([
  [53.080689, 20.084192],
  [44.080185, 44.021595],
]);
var latLngBoundsFreedom = L.latLngBounds([
  [54.441274, 9.456578],
  [50.06189, 15.409602],
]);

const inconsForMarkers = (src) =>
  L.icon({
    iconUrl: src,

    iconSize: [30], // size of the icon
    iconAnchor: [15, 0], // point of the icon which will correspond to marker's location
    popupAnchor: [-5, 0], // point from which the popup should open relative to the iconAnchor
  });

const greekCatholicsmarkers = routs.map((rout) => {
  return maps[rout].greekCatholics;
});
const ortodoxChristiansmarkers = routs.map((rout) => {
  return maps[rout].ortodoxChristians;
});
const protestantsmarkers = routs.map((rout) => {
  return maps[rout].protestants;
});
const muslimsmarkers = routs.map((rout) => {
  return maps[rout].muslims;
});
const jewsmarkers = routs.map((rout) => {
  return maps[rout].jews;
});
const freedomMaps = routs.map((rout) => {
  return maps[rout].freedom;
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
  greekCatholics: false,
  ortodoxChristians: false,
  protestants: false,
  muslims: false,
  jews: false,
  freedom: false,
};
let typesOfMapstoggle = true;
btn.addEventListener("click", (e) => {
  console.log("yes");
  hero.style.top = "-120%";
});

const typesDrawer = (state, date) => {
  myGroup.clearLayers();

  if (state.greekCatholics) {
    greekCatholicsmarkers
      .filter((_, i) => i <= date)
      .filter(Array.isArray)
      .flat()
      .forEach((p) => {
        myGroup.addLayer(
          L.marker(p[0], { icon: catholiccross })
            .addTo(map)
            .bindPopup(
              `<div class="popup"  style="height: 260px"><h3>${p[1]}</h3><p>${p[2]}<br>${p[3]}</p>
     <img src="${p[4]}" alt="Portrait of Golda Meir" style="width: auto; height: 150px; margin-bottom:8px;"></div>`
            )
        );
      });
  }
  if (state.ortodoxChristians) {
    ortodoxChristiansmarkers
      .filter((_, i) => i <= date)
      .filter(Array.isArray)
      .flat()
      .forEach((p) => {
        myGroup.addLayer(
          L.marker(p[0], { icon: ortodoxcross })
            .addTo(map)
            .bindPopup(
              `<div class="popup"  style="height: 260px"><h3>${p[1]}</h3><p>${p[2]}<br>${p[3]}</p>
     <img src="${p[4]}" alt="Portrait of Golda Meir" style="width: auto; height: 150px; margin-bottom:8px;"></div>`
            )
        );
      });
  }
  if (state.protestants) {
    protestantsmarkers
      .filter((_, i) => i <= date)
      .filter(Array.isArray)
      .flat()
      .forEach((p) => {
        myGroup.addLayer(
          L.marker(p[0])
            .addTo(map)
            .bindPopup(
              `<div class="popup"  style="height: 260px"><h3>${p[1]}</h3><p>${p[2]}<br>${p[3]}</p>
     <img src="${p[4]}" alt="Portrait of Golda Meir" style="width: auto; height: 150px; margin-bottom:8px;"></div>`
            )
        );
      });
  }
  if (state.muslims) {
    muslimsmarkers
      .filter((_, i) => i <= date)
      .filter(Array.isArray)
      .flat()
      .forEach((p) => {
        myGroup.addLayer(
          L.marker(p[0], { icon: inconsForMarkers(p[4]) })
            .addTo(map)
            .bindPopup(
              `<div class="popup"  style="height: 260px"><h3>${p[1]}</h3><p>${p[2]}<br>${p[3]}</p>
     <img src="${p[4]}" alt="Portrait of Golda Meir" style="width: auto; height: 150px; margin-bottom:8px;"></div>`
            )
        );
      });
  }
  if (state.jews) {
    jewsmarkers
      .filter((_, i) => i <= date)
      .filter(Array.isArray)
      .flat()
      .forEach((p) => {
        myGroup.addLayer(
          L.marker(p[0])
            .addTo(map)
            .bindPopup(
              `<div class="popup"  style="height: 260px"><h3>${p[1]}</h3><p>${p[2]}<br>${p[3]}</p>
     <img src="${p[4]}" alt="Portrait of Golda Meir" style="width: auto; height: 150px; margin-bottom:8px;"></div>`
            )
        );
      });
  }
  if (state.freedom) {
    freedomMaps
      .filter((_, i) => i <= date)
      .filter(Array.isArray)
      .flat()
      .forEach((p) => {
        myGroup.addLayer(freedomOverlayDrawer(p[0], p[1]));
      });
  }
  if (state.borders) {
    myGroup.addLayer(polygons[date]);
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
const ethnolinguistic = (state, date) => {
  if (state) return imageOverlayEthnolinguistic.addTo(map);
  return map.removeLayer(imageOverlayEthnolinguistic);
};

const freedomOverlayHandler = (state, date) => {
  console.log("freedomH");
  typesOfMapsState.freedom = state;
  typesDrawer(typesOfMapsState, date);
};

const greekCatholicsHandler = (state, date) => {
  console.log("greekCatholicsHandler");
  typesOfMapsState.greekCatholics = state;
  typesDrawer(typesOfMapsState, date);
};
const ortodoxChristiansHandler = (state, date) => {
  console.log("ortodoxChristiansHandler");
  typesOfMapsState.ortodoxChristians = state;
  typesDrawer(typesOfMapsState, date);
};
const protestantsHandler = (state, date) => {
  console.log("protestants");
  typesOfMapsState.protestants = state;
  typesDrawer(typesOfMapsState, date);
};
const muslimsHandler = (state, date) => {
  console.log("muslims");
  typesOfMapsState.muslims = state;
  typesDrawer(typesOfMapsState, date);
};
const jewsHandler = (state, date) => {
  console.log("muslims");
  typesOfMapsState.jews = state;
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
    if (e.target.value == "greekCatholics")
      return greekCatholicsHandler(e.target.checked, swiperState);
    if (e.target.value == "ortodoxChristians")
      return ortodoxChristiansHandler(e.target.checked, swiperState);
    if (e.target.value == "ethnolinguistic")
      return ethnolinguistic(e.target.checked);
    if (e.target.value == "protestants")
      return protestantsHandler(e.target.checked, swiperState);
    if (e.target.value == "muslims")
      return muslimsHandler(e.target.checked, swiperState);
    if (e.target.value == "jews")
      return jewsHandler(e.target.checked, swiperState);
    if (e.target.value == "freedom")
      return freedomOverlayHandler(e.target.checked, swiperState);
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
  // maxBounds: [
  //   [35, 15], // юго-западная точка (примерно)
  //   [60, 50], // северо-восточная точка (примерно)
  // ],
  minZoom: 4,
  maxBoundsViscosity: 0, // prevent dragging outside
});

var imageOverlayEthnolinguistic = L.imageOverlay(imageUrl, latLngBounds, {
  opacity: 0.8,
  errorOverlayUrl: errorOverlayUrl,
  alt: altText,
  interactive: true,
});
var imageOverlayFreedom = L.imageOverlay(imageFreedom, latLngBoundsFreedom, {
  opacity: 0.8,
  errorOverlayUrl: errorOverlayUrl,
  alt: altText,
  interactive: true,
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
