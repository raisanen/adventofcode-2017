const day11 = (input) => {
  let path = input.split(/,/),
      start = [0, 0, 0],
      maxDistance = 0;
  
  const directions = {
    'n':  [ 0,  1, -1],
    'nw': [-1,  1,  0],
    'ne': [ 1,  0, -1],
    's':  [ 0, -1,  1],
    'sw': [-1,  0,  1],
    'se': [ 1, -1,  0]
  };
  const move = (a, dist) => a.map((n, i) => n + dist[i]);
  const dist = (s) => s.map(Math.abs).reduce((a, c) => a + c) / 2;
  
  path.forEach((dir) => {
    start = move(start, directions[dir]);
    
    let currDistance = dist(start);
    if (currDistance > maxDistance) {
      maxDistance = currDistance;
    }
  });
  
  console.log('A:', dist(start));
  console.log('B:', maxDistance);
}