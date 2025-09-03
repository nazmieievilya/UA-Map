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
  if (state.people) console.log("people");
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

// Golda Meir – Kyiv
// L.marker([50.45, 30.8233])
//   .addTo(map)
//   .bindPopup(
//     `<div class="popup"><h3>Golda Meir</h3><p>Born in Kyiv<br>One of the founders of the State of Israel.</p>
//     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Golda_Meir_%281964%29_cropped.jpg/800px-Golda_Meir_%281964%29_cropped.jpg" alt="Portrait of Golda Meir" style="width: 150px; height:auto; margin-bottom:8px;"></div>`
//   );

// // Moshe Sharett – Kherson
// L.marker([46.6558, 32.6178])
//   .addTo(map)
//   .bindPopup(
//     `<div class="popup"><h3>Moshe Sharett</h3><p>Born in Kherson<br>Prime Minister of Israel (1954–1955).</p>
//     <img src="https://m.knesset.gov.il/About/Lexicon/PublishingImages/sharett_1.jpg" alt="Portrait of Golda Meir" style="width: 150px; height:auto; margin-bottom:8px;"></div>`
//   );

// // Ephraim Katzir – Kyiv

// // Yitzhak Ben-Zvi – Poltava
// L.marker([49.5937, 34.5407])
//   .addTo(map)
//   .bindPopup(
//     `<div class="popup"><h3>Yitzhak Ben-Zvi</h3><p>Born in Poltava<br>President of Israel (1952–1963).</p>
//      <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Yitzhak_Ben-Zvi.jpg" alt="Portrait of Golda Meir" style="width: 150px; height:auto; margin-bottom:8px;"></div>`
//   );

// // Antony Blinken – Pereiaslav (Kyiv oblast)
// L.marker([50.452, 30.68])
//   .addTo(map) // Approximate coords for Pereiaslav
//   .bindPopup(
//     `<div class="popup"><h3>Antony Blinken</h3><p>Great-grandson of Meir Blinken, a native of Pereiaslav (Kyiv oblast)<br>U.S. Secretary of State, of Ukrainian-Jewish descent.</p>
//      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Secretary_Blinken%27s_Official_Department_Photo.jpg/250px-Secretary_Blinken%27s_Official_Department_Photo.jpg" alt="Portrait of Golda Meir" style="width: 150px; height:auto; margin-bottom:8px;"></div>`
//   );
