console.log("APP!", window.step);
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let game = Ant.initGame();
let cellSize = 50;
canvas.width = game.grid[0].length * cellSize;
canvas.height = game.grid.length * cellSize;

const draw = game => {
  let { grid, ant } = game;
  console.log("draw"); //REM
  grid.forEach((row, row_index) => {
    console.log("row", row, row_index); //REM
    row.forEach((val, col_index) => {
      console.log("col", val, col_index); //REM
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
  ctx.fontStyle = `Arial ${cellSize / 2}px`;
  // ctx.rotate(-(ant.dir + 1) * Math.PI / 2);
  ctx.fillText(
    "ANT",
    ant.col * cellSize + cellSize / 4,
    ant.row * cellSize + cellSize / 4
  );
  ctx.restore();
};

// main

Ant.loop(game => {
  draw(game);
}, game);
