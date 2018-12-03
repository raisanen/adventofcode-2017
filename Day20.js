class Particle {
  pos = []
  vel = []
  acc = []
  id = -1
  
  constructor(line, id) {
    const parseXYZ = (s) => s.match(/<([^,]+),([^,]+),([^>]+)>/).slice(1).map(Number);
    [this.pos, this.vel, this.acc] = line.split(/,\s+/).map(parseXYZ);
    this.id = id
  }
  
  isSame(b) {
    return this.pos[0] === b.pos[0] && this.pos[1] === b.pos[1] && this.pos[2] === b.pos[2];
  }
  
  dist() {
    return this.pos.reduce((a, c) => Math.abs(a) + Math.abs(c), 0);
  }
  
  tick() {
    const upd = deltas => (el, idx) => el + deltas[idx];
    
    this.vel = this.vel.map(upd(this.acc))
    this.pos = this.pos.map(upd(this.vel));
  }
}

const THRESHOLD = 1000; // How many iterations to wait for answer to change

const part1 = (input) => {
  let particles = input.split(/\n+/).map(l => new Particle(l)),
      lastMinIndex = -1;
  
  const tick = () => particles.forEach(p => p.tick());
  
  for (let ticksSinceMinChanged = 0; ticksSinceMinChanged < THRESHOLD; ticksSinceMinChanged++) {
    let distances = particles.map(p => p.dist()),
        currMinIndex = distances.indexOf(Math.min(...distances));
    
    if (currMinIndex !== lastMinIndex) {
      lastMinIndex = currMinIndex;
      ticksSinceMinChanged = 0;
    }
    tick();
  }
  
  console.log('A:', lastMinIndex);
};

const part2 = (input) => {
  let particles = input.split(/\n+/).map((l, i) => new Particle(l, i));
  
  const tick = () => particles.forEach(p => p.tick());
  
  for (let ticksSinceCollision = 0; ticksSinceCollision < THRESHOLD; ticksSinceCollision++) {
    let remove = [];
    
    particles.forEach(p => {
      let cols = particles.filter(b => b.isSame(p) && b.id !== p.id).map(o => o.id);
      if (cols.length > 0) {
        remove = remove.concat(cols);
        remove.push(p.id);
      }
    });
    
    if (remove.length > 0) {
      ticksSinceCollision = 0;
      particles = particles.filter(p => remove.indexOf(p.id) === -1);
    }
    tick();
  }
  
  console.log('B:', particles.length);
};
