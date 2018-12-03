const part1 = (input) => {
  let connections = {};
  let rows = input.split(/\n+/).forEach(r => {
    let [p, cons] = r.split(/\s+<->\s+/);
    connections[p] = cons.split(/,\s+/).map(n => n);
  });
  let seen = [];
  
  const findNeighbours = (p) => {
    if (seen.indexOf(p) < 0) {
      seen.push(p);
    } 
    connections[p].forEach(c => {
      if (seen.indexOf(c) < 0){
        findNeighbours(c);
      }
    });
  }
  findNeighbours('0');

  console.log('A:', seen.length);
};

const part2 = (input) => {
  let connections = {};
  let rows = input.split(/\n+/).forEach(r => {
    let [p, cons] = r.split(/\s+<->\s+/);
    connections[p] = cons.split(/,\s+/).map(n => n);
  });
  let groups = {};
  
  const findNeighbours = (g, p) => {
    if (groups[g].indexOf(p) < 0) {
      groups[g].push(p);
    } 
    connections[p].forEach(c => {
      if (groups[g].indexOf(c) < 0){
        findNeighbours(g, c);
      }
    });
  }
  for (var k in connections) {
    let alreadyGrouped = Object.values(groups).filter(a => a.indexOf(k) >= 0).length;
    if (!alreadyGrouped) {
      groups[k] = [];
      
      findNeighbours(k, k);
    }
  }

  console.log('B:', Object.values(groups).length);
};