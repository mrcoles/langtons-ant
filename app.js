console.log("APP!", window.step);
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let game = Ant.initGame();
let cellSize = 50;
canvas.width = game.grid[0].length * cellSize;
canvas.height = game.grid.length * cellSize;

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
  // ctx.rotate(-(ant.dir + 1) * Math.PI / 2);
  console.log(
    "ANT",
    JSON.stringify(ant),
    ant.col * cellSize,
    ant.row * cellSize
  );
  ctx.fillText(
    "🐜",
    ant.col * cellSize + cellSize / 4,
    (ant.row + 1) * cellSize - cellSize / 4
  );
  ctx.restore();
};

// main

Ant.loop(game => {
  draw(game);
}, game);
