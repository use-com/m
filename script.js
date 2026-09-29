const items = [
  {cls: "scholl27", x: 35,  y: 460},
  {cls: "arena", x: 32, y: 575},
  {cls: "scholl22", x: 243, y: 407},
  {cls: "carsk", x: 160, y: 577},
  {cls: "trol", x: 383, y: 600},
  {cls: "absolut", x: 747, y: 257},
  {cls: "maxi", x: 523, y: 349},
  {cls: "leni", x: 878, y: 157},
  {cls: "vokzal", x: 1096, y: 117},
  {cls: "park", x: 868, y: 12},
];

const musics = [
  new Audio("./source/2026 09 14 - 07 29 арена.mp3"),

  new Audio("./source/2026 09 14 - 07 35 школа 27 in.mp3"),
  new Audio("./source/2026 09 14 - 11 17 школа 27 in.mp3"),

  new Audio("./source/2026 09 14 - 14 24 царский.mp3"),
  new Audio("./source/2026 09 16 - 20 40 царский in.mp3"),

  new Audio("./source/2026 09 14 - 19 38 абсолют.mp3"),

  new Audio("./source/2026 09 16 - 13 11 школа 22.mp3"),

  new Audio("./source/2026 09 16 - 13 30 макси in.mp3"),
  new Audio("./source/2026 09 16 - 13 31 макси.mp3"),

  new Audio("./source/2026 09 16 - 19 35 площадь Ленина.mp3"),

  new Audio("./source/2026 09 16 - 19 39 вход в парк культуры и отдыха.mp3"),

  new Audio("./source/2026 09 16 - 19 49 вокзал.mp3"),

  new Audio("./source/2026 09 16 - 20 51 троллейбусное депо.mp3"),


  /* new Audio("./source/2026 09 16 - 19 40 человек на входе в в парк культ. и отдыха.mp3"),
  new Audio("./source/2026 09 16 - 13 17 лес Северный.mp3") */
]
const names = [
  'утро',
  'утро',
  'день',
  'день',
  'вечер',
  'вечер',
  'день',
  'день',
  'день',
  'вечер',
  'вечер',
  'вечер',
  'вечер',

/*  'вечер - на улице',
  'день - на улице' */
]


function pri(v=0,ii=0,ia=0,oi=0,oa=0) {
  return oi+(v-ii)*(oa-oi)/(ia-ii);
}

function page(id=0) {
  let type = "";
  let idi = [];
  let ido = [];

  if(id == 0) {
    type = "школа 27";
    idi = [1, 2];
  }
  if(id == 1) {
    type = "тц. Арена";
    ido = [0];
  }
  if(id == 2) {
    type = "школа 22";
    ido = [6];
  }
  if(id == 3) {
    type = "тц. Царский";
    idi = [4]; ido = [3];
  }
  if(id == 4) {
    type = "троллейбусное депо";
    ido = [12];
  }
  if(id == 5) {
    type = "Абсолют";
    ido = [5];
  }
  if(id == 6) {
    type = "Макси";
    idi = [7]; ido = [8];
  }
  if(id == 7) {
    type = "пл. Ленина";
    idi = [9];
  }
  if(id == 8) {
    type = "вокзал";
    ido = [11];
  }
  if(id == 9) {
    type = "парк культуры и отдыха";
    ido = [10];
  }

  let files = '';
  if(idi.length) {
    files = files + '<h2 style="margin: 0px; margin-left: 10px;">Записи внутри помещения:</h2>';
  }
  for(const i of idi) {
    files = files + '<button class="cont" id='+i+' style="background-color: #ddd; width: 50%; height: 50px; margin: 5px;"><h3>' + names[i] + '</h3></button>';
  }
  if(ido.length) {
    files = files + '<h2 style="margin: 0px; margin-left: 10px;">Записи на улице:</h2>';
  }
  for(const i of ido) {
    files = files + '<button class="cont" id='+i+' style="background-color: #ddd; width: 50%; height: 50px; margin: 5px;"><h3>' + names[i] + '</h3></button>';
  }

  return ("<h1 style='color: #2f0e57; background-color: #32ce3f8a';>" + type + "</h1>" +
    files
  );
}



function disablePanel() {
  document.querySelectorAll('.panel').forEach(p => {
    p.classList.add('disabled');
  });
}

function enablePanel() {
  document.querySelectorAll('.panel').forEach(p => {
    p.classList.remove('disabled');
  });
}



let pan = false;
let bti = 0;
disablePanel();

document.querySelectorAll(".bt").forEach(btn => {
  btn.onclick = () => {
    for(const music of musics) {
      music.pause();
      music.currentTime = 0;
    }
    if(btn.id == bti || !pan) pan = !pan;
    bti = btn.id;
    if(pan) {
      document.querySelector(".panel").innerHTML = page(btn.id);
      document.querySelectorAll(".cont").forEach(btn => {
        btn.onclick = () => {
          for(const music of musics) {
            music.pause();
            music.currentTime = 0;
          }
          musics[btn.id].play().catch(e => console.warn(e));
        }
      })
      enablePanel();
    } else {
      disablePanel();
    }
  }
})

document.getElementById("car").onclick = () => {
  window.location.href = "/m/";
}

document.getElementById("pre").onclick = () => {
  window.location.href = "/m/contemp";
}

function update() {
  const width = document.querySelector(".cart").clientWidth;
  const height = document.querySelector(".cart").clientHeight;
  for (const { cls, x, y } of items) {
    const el = document.querySelector("." + cls);
    if (!el) continue;
    el.style.left = (pri(x, 0, 1152, 0, width)) + "px";
    el.style.top  = (pri(y, 0, 623, 0, height))+40 + "px";
  }
  requestAnimationFrame(update());
}
requestAnimationFrame(update());