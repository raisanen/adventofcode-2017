const delta = (n) => {
  let deltaXY = {x: 0, y: 0},
      ceil_root = Math.ceil(Math.sqrt(n));
      
  if (ceil_root % 2 === 0) {
    if (n <= (Math.pow(ceil_root, 2) - ceil_root)) {
      deltaXY.x = 1;
    } else {
      deltaXY.y = 1;
    }
  } else {
    if (n <= Math.pow(ceil_root, 2) && n > Math.pow(ceil_root, 2) - ceil_root) {
      deltaXY.y = -1;
    } else {
      deltaXY.x = -1;
    }
  }
  return deltaXY;
};

const part1 = (lim) => {
  let x = 0, y = 0;
  let res = [''];
  
  for (let i = 1; i <= lim; i++) {
    res[i] = {x: x, y: y};
    let deltaXY = delta(i);
    x += deltaXY.x;
    y += deltaXY.y;
  } 
  console.log(`Distance from 1 to ${lim}:`, Math.abs(res[lim].x) + Math.abs(res[lim].y));
};

const part2 = (lim) => {
  let x = 0, y = 0;
  let grid = [[1]];
  
  for (let i = 1; ; i++) {
    if (typeof grid[x] === 'undefined') {
      grid[x] = [];
    }
    grid[x][y] = (() => {
      let adjSum = 0;
      for (let dx = x-1; dx <= x+1; dx++) {
        for (let dy = y-1; dy <= y+1; dy++) {
          if (typeof grid[dx] !== 'undefined' && typeof grid[dx][dy] !== 'undefined') {
            adjSum += grid[dx][dy];
          }
        }
      }
      return adjSum;      
    })();

    if (grid[x][y] >= lim) {
      console.log(`First over ${lim}: ${grid[x][y]}`);
      console.log(`(iterations: ${i})`);
      break;
    }

    let deltaXY = delta(i);
    x += deltaXY.x;
    y += deltaXY.y;
  }
};