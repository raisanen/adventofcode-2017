const part1 = (input) => {
  let fireWall = {},
      severity = 0;
  
  input.split(/\n+/).forEach(l => {
    let [k, r] = l.split(/:\s+/).map(Number);
    fireWall[k] = {range: r, pos: 0, dir: 1};
    maxLayer = k;
  });
  
  const tick = () => {
    for (let k in fireWall) {
      if (fireWall.hasOwnProperty(k)) {
        if (fireWall[k].pos === 0) {
          fireWall[k].dir = 1;
        } else if (fireWall[k].pos === fireWall[k].range - 1) {
          fireWall[k].dir = -1;
        }
        fireWall[k].pos += fireWall[k].dir;
      }
    }
  };
  
  for (let pos = 0; pos <= maxLayer; pos++) {
    if (fireWall[pos] && fireWall[pos].pos === 0) {
      severity += pos * fireWall[pos].range;
    }
    tick();
  }
  console.log('Severity:', severity);
};

const part2 = (input) => {
  const fireWall = input.split(/\n+/).map(l => l.split(/:\s+/).map(Number));
  const isCaught = (delay, [layer, range]) => (delay + layer) % (2 * (range - 1)) === 0;
  
  for (let delay = 0; ; delay++) {
    let anyCaught = false;
    for (let i = 0; i < fireWall.length; i++) {
      if (isCaught(delay, fireWall[i])) {
        anyCaught = true;
        break;
      }
    }
    if (!anyCaught) {
      console.log('Min delay:', delay);
      break;
    }
  }  
};