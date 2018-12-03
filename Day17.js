const part1 = (stepSize=3) => {
  let mem = [0], n = 0;
  
  for (let i = 1; i <= 2017; i++) {
    let insertAt = (n) % mem.length;
    mem.splice(insertAt + 1, 0, i);
    n = mem.indexOf(i) + stepSize;
  }
  console.log('A:', mem[(n - stepSize + 1) % mem.length]);
};

const part2 = (stepSize) => {
  let mem = [0], n = 0, lastA = 0;
  
  for (let i = 1; i <= 5e7; i++) {
    let insertAt = (n) % i;
    n = (insertAt + 1 + stepSize);
    if (insertAt + 1 === 1) {
      lastA = i;
    }
  }  
  console.log('B:', 5e7, lastA);
}