const factorA = 16807,
      factorB = 48271,
      mod  = 2147483647,
      mask = 0xffff,
      next = (cur, factor, m) => (cur = (cur * factor % mod)) % m === 0 ? cur : next(cur, factor, m),
      match = (a, b) => (a & mask) === (b & mask);

const findMatches = (startA, startB, modA=1, modB=1, lim=5e6) => {
  let currA = startA,
      currB = startB,
      matchCount = 0;

  for (let i = 0; i < lim; i++) {
    currA = next(currA, factorA, modA);
    currB = next(currB, factorB, modB);
    if (match(currA, currB)) {
      matchCount++;
    }
  }
  return matchCount;
}

const part1 = (startA, startB) => console.log('A:', findMatches(startA, startB, 1, 1, 40e6));
const part2 = (startA, startB) => console.log('B:', findMatches(startA, startB, 4, 8, 5e6));