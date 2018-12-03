const day19 = (input) => {
  const maze = input.split(/\n+/).map(l => l.split(''));
  let pos = {r: 0, c: maze[0].indexOf('|')},
      found = '',
      dir = {r: 1, c: 0},
      steps = -1;

  for (; pos.r >= 0 && pos.r < maze.length && pos.c >= 0 && pos.c < maze[pos.r].length; steps++) {
    let curCell = maze[pos.r][pos.c];
    if (curCell === '+') {
      if (dir.r === 0) {
        if (pos.r > 0 && maze[pos.r - 1][pos.c].match(/[A-Z\|]/)) {
          dir = { r: -1, c: 0};
        } else if (pos.r < maze.length && maze[pos.r + 1][pos.c].match(/[A-Z\|]/)) {
          dir = { r: +1, c: 0};
        }        
      } else {
        if (pos.c > 0 && maze[pos.r][pos.c - 1].match(/[A-Z\-]/)) {
          dir = { r: 0, c: -1};
        } else if (pos.c < maze[pos.r].length && maze[pos.r][pos.c + 1].match(/[A-Z\-]/)) {
          dir = { r: 0, c: 1};
        }
      }
    } else if (curCell.match(/[A-Z]/)) {
      found += curCell;
    }
    
    pos = {r: pos.r + dir.r, c: pos.c + dir.c};
  }
  
  console.log('A:', found, 'B:', steps);
}