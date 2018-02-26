const WHITE = "_";
const BLACK = "X";

const DIR_UP = 0;
const DIR_RIGHT = 1;
const DIR_DOWN = 2;
const DIR_LEFT = 3;

const makeGrid = (rows, cols) => {
  let grid = [];
  while (rows-- > 0) {
    let row = [];
    for (let i = 0; i < cols; i++) {
      row.push(WHITE);
    }
    grid.push(row);
  }
};

const initGame = () => {
  let grid = makeGrid(11, 11);
  return {
    ant: {
      row: 5,
      col: 5,
      dir: DIR_UP
    },
    grid: grid
  };
};

const step = game => {
  let { grid, ant } = game;
  grid = _shallowCopy(grid);
  ant = _shallowCopy(ant);
  let color = grid[ant.row][ant.col];
  ant.dir = (ant.dir + (color === WHITE ? 1 : -1)) % 4;
  grid[ant.row][ant.col] = color === WHITE ? BLACK : WHITE;

  let row_max = grid.length - 1;
  let col_max = grid[0].length - 1;

  switch (ant.dir) {
    case DIR_UP:
      ant.row = Math.max(0, ant.row - 1);
      break;
    case DIR_DOWN:
      ant.row = Math.min(row_max, ant.row + 1);
      break;
    case DIR_LEFT:
      ant.col = Math.max(0, ant.col - 1);
      break;
    case DIR_RIGHT:
      ant.col = Math.min(col_max, ant.col + 1);
      break;
    default:
      throw new Error(`UKNOWN DIRECTIONS: ${ant.dir}`);
  }

  return { grid, ant };
};

const _shallowCopy = obj => Object.assign({}, obj);

const loop = (callback, game) => {
  game = game || initGame();
  setTimeout(() => {
    callback && callback();
    loop(callback, game);
  }, 500);
};

window.Ant = {
  initGame,
  step,
  loop
};

// main runner

// require.main === module && loop();
