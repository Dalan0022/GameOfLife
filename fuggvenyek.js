// 2D Tömb létrehozása
function tomb2d(oszlopok, sorok) {
  let tomb = new Array(oszlopok);
  for (let i = 0; i < tomb.length; i++) {
    tomb[i] = new Array(sorok);
  }
  return tomb;
}

let halo;
let oszlopok;
let sorokok;
let felbontas = 10;

// 2D Tömb feltöltése random
function setup() {
  createCanvas(1000, 1000);
  oszlopok = width / felbontas;
  sorok = height / felbontas;

  halo = tomb2d(oszlopok, sorok);
  for (let i = 0; i < oszlopok; i++) {
    for (let j = 0; j < sorok; j++) {
      halo[i][j] = floor(random(2));
    }
  }
}

// Kijelzés a képernyőre
function kijelez() {
  background(0);

  for (let i = 0; i < oszlopok; i++) {
    for (let j = 0; j < sorok; j++) {
      let x = i * felbontas;
      let y = j * felbontas;
      if (halo[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, felbontas - 1, felbontas - 1);
      }
    }
  }

  let next = tomb2d(oszlopok, sorok);

  // A következőt állapotok a hálón
  for (let i = 0; i < oszlopok; i++) {
    for (let j = 0; j < sorok; j++) {
      let allapot = halo[i][j];
      // Szomszédok számolása
      let szamol = 0;
      let szomszed = countSzomszed(halo, i, j);

      if (allapot == 0 && szomszed == 3) {
        next[i][j] = 1;
      } else if (allapot == 1 && (szomszed < 2 || szomszed > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = allapot;
      }
    }
  }

  halo = next;
}

function countSzomszed(halo, x, y) {
  let szamol = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let oszlop = (x + i + oszlopok) % oszlopok;
      let sor = (y + j + sorok) % sorok;
      szamol += halo[oszlop][sor];
    }
  }
  szamol -= halo[x][y];
  return szamol;
}
