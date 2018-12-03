
const part1 = (inp, numBursts) => {
  let grid = inp.split(/\n+/).map(l => l.split('')),
      numInfections = 0,
      y = Math.floor(grid.length / 2),
      x = Math.floor(grid[y].length / 2),
      dir = 'n';
      
  console.log(x, y);
  
  const turn = (left, currDir) => {
    switch (currDir) {
      case 'n': return left ? [x - 1, y, 'w'] : [x + 1, y, 'e'];
      case 's': return left ? [x + 1, y, 'e'] : [x - 1, y, 'w'];
      case 'w': return left ? [x, y + 1, 's'] : [x, y - 1, 'n'];
      case 'e': return left ? [x, y - 1, 'n'] : [x, y + 1, 's'];
    }
  };
  for (let i = 0; i < numBursts; i++) {
    if (typeof grid[y] === 'undefined') {
      grid[y] = [];
    }
    if (typeof grid[y][x] === 'undefined') {
      grid[y][x] = '.';
    }
    
    let wasClean = grid[y][x] === '.';
    
    grid[y][x] = wasClean ? '#' : '.';
    numInfections += wasClean ? 1 : 0;
    
    [x, y, dir] = turn(wasClean, dir);
  }
  console.log('A:', numInfections);
};

const part2 = (inp, numBursts) => {
  let grid = inp.split(/\n+/).map(l => l.split('')),
      numInfections = 0,
      y = Math.floor(grid.length / 2),
      x = Math.floor(grid[y].length / 2),
      dir = 'n',
      rules = {
        '.n': () => [x - 1, y, 'w'],
        '.s': () => [x + 1, y, 'e'],
        '.e': () => [x, y - 1, 'n'],
        '.w': () => [x, y + 1, 's'],
        
        '#n': () => [x + 1, y, 'e'],
        '#s': () => [x - 1, y, 'w'],
        '#e': () => [x, y + 1, 's'],
        '#w': () => [x, y - 1, 'n'],
        
        'wn': () => [x, y - 1, 'n'],
        'ws': () => [x, y + 1, 's'],
        'ww': () => [x - 1, y, 'w'],
        'we': () => [x + 1, y, 'e'],
        
        'fn': () => [x, y + 1, 's'],
        'fs': () => [x, y - 1, 'n'],
        'fw': () => [x + 1, y, 'e'],
        'fe': () => [x - 1, y, 'w']
      };
  
  for (let i = 0; i < numBursts; i++) {
    if (typeof grid[y] === 'undefined') {
      grid[y] = [];
    }
    if (typeof grid[y][x] === 'undefined') {
      grid[y][x] = '.';
    }
    let prevState = grid[y][x];
    switch (prevState) {
      case '.': grid[y][x] = 'w'; break;
      case 'w': grid[y][x] = '#'; numInfections++; break;
      case '#': grid[y][x] = 'f'; break;
      case 'f': grid[y][x] = '.'; break;
    }
    [x, y, dir] = rules[prevState + dir]();
  }
  console.log('B:', numInfections);
};