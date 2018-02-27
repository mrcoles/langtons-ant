import Ant from "./ant";

// console.log("APP!", window.step);
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let GAME = Ant.initGame();
let cellSize = 50;
canvas.width = GAME.grid[0].length * cellSize;
canvas.height = GAME.grid.length * cellSize;

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
  // console.log(
  //   "ANT",
  //   JSON.stringify(ant),
  //   ant.col * cellSize,
  //   ant.row * cellSize
  // );
  ctx.fillText(
    "🐜",
    -cellSize / 4,
    cellSize / 4
    // ant.col * cellSize + cellSize / 4,
    // (ant.row + 1) * cellSize - cellSize / 4
  );
  ctx.restore();

  return true; //false;
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

// main

start();
