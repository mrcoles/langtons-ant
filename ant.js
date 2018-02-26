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
