import Ant from "./ant";

import antImgSrc from "./ant.png";

let antImg = new Image();
antImg.src = antImgSrc;

let imgLoader = new Promise((resolve, reject) => {
  antImg.onload = () => {
    console.log(antImg);
    resolve(antImg);
  };
  antImg.onerror = e => {
    reject(e);
  };
});

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let GAME = Ant.initGame();
let cellSize = 50;
let WIDTH = GAME.grid[0].length * cellSize;
let HEIGHT = GAME.grid.length * cellSize;

// canvas ratio woo! makes image sharp!
// https://www.html5rocks.com/en/tutorials/canvas/hidpi/
let devicePixelRatio = window.devicePixelRatio || 1;
let backingStoreRatio =
  ctx.webkitBackingStorePixelRatio ||
  ctx.mozBackingStorePixelRatio ||
  ctx.msBackingStorePixelRatio ||
  ctx.oBackingStorePixelRatio ||
  ctx.backingStorePixelRatio ||
  1;
let canvasRatio = devicePixelRatio / backingStoreRatio;

console.log("canvasRatio", canvasRatio);

canvas.width = WIDTH * canvasRatio;
canvas.height = HEIGHT * canvasRatio;
canvas.style.width = `${WIDTH}px`;
canvas.style.height = `${HEIGHT}px`;
ctx.scale(canvasRatio, canvasRatio);

const draw = game => {
  let { grid, ant } = game;
  grid.forEach((row, row_index) => {
    row.forEach((val, col_index) => {
      ctx.fillStyle = val === Ant.WHITE ? "#fff" : "#000";
      ctx.fillRect(
        col_index * cellSize,
        row_index * cellSize,
        cellSize,
        cellSize
      );
      ctx.strokeStyle = "red";
      ctx.strokeRect(
        col_index * cellSize,
        row_index * cellSize,
        cellSize,
        cellSize
      );
    });
  });
  ctx.save();
  ctx.fillStyle = "red";
  ctx.font = `${cellSize * 0.5}px Arial`;
  ctx.translate(
    ant.col * cellSize + cellSize / 2,
    ant.row * cellSize + cellSize / 2
  );
  // 0 is up - 270deg
  // 1 is right - 180deg
  // 2 is down - 90deg
  // 3 is left - no change
  ctx.rotate((ant.dir - 3) * Math.PI / 2);

  let antRatio = 0.5;
  ctx.scale(antRatio, antRatio);
  ctx.drawImage(antImg, -antImg.width / 2, -antImg.height / 2);

  ctx.restore();

  return true;
};

// loop

let PAUSED = false;
let DELAY = 1000;

const start = () => {
  Ant.loop(game => {
    GAME = game;
    draw(game);
    return { goAgain: !PAUSED, delay: DELAY };
  }, GAME);
};

// evts

document.getElementById("pause_play").addEventListener(
  "click",
  () => {
    PAUSED = !PAUSED;
    if (!PAUSED) {
      start();
    }
  },
  false
);

document.getElementById("step").addEventListener(
  "click",
  () => {
    if (PAUSED) {
      start();
    }
  },
  false
);

document.getElementById("delay").addEventListener(
  "change",
  e => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) {
      val = 1000;
      e.target.value = val;
    }
    if (val < 0) {
      val = 0;
      e.target.value = val;
    }
    DELAY = val;
  },
  false
);

// main - wait for images to load!

imgLoader.then(start).catch(console.error);
