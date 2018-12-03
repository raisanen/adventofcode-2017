const Day07 = {
  parseList: (input) => {
    let rows = input.split(/\n+/),
        output = [];
        
    for (let i = 0; i < rows.length; i++) {
      let matches = rows[i].match(/^([a-z]+) \((\d+)\)/);
      let disc = {
        name: matches[1],
        weight: +matches[2]
      }
      if (rows[i].match(/->/)) {
        disc.children = rows[i].match(/-> (.*)/)[1].split(/,\s+/);
      }  
      output.push(disc);
    }
    
    return output;
  },
  
  findRoot: (tower, currDisc=null) => {
    currDisc = currDisc || tower[0];
    
    for (let i = 0; i < tower.length; i++) {
      if (tower[i].children && tower[i].children.indexOf(currDisc.name) >= 0) {
        return Day07.findRoot(tower, tower[i]); 
      }
    }
    return currDisc;
  },
  
  findParent: (disc, tower) => {
    for (let i = 0; i < tower.length; i++) {
      if (tower[i].children && tower[i].children.indexOf(disc.name) >= 0) {
        return tower[i]; 
      }
    }
    
    return disc;
  },
  
  findDisc: (name, tower) => {
    return (tower.filter((d) => d.name === name) || [{}])[0];
  },
  
  setTotalWeights: (disc, tower) => {
    disc.totalWeight = disc.weight;
    
    if (disc.children) {
      for (let i = 0; i < disc.children.length; i++) {
        let child = Day07.findDisc(disc.children[i], tower);
        child.totalWeight = Day07.setTotalWeights(child, tower);
        disc.totalWeight += child.totalWeight;
      }
    }
    
    return disc.totalWeight;
  },
  
  findUnbalancedChild: (root, tower) => {
    let children = (root.children || []).map((n) => Day07.findDisc(n, tower)),
        maxWeight = children.reduce((a, c) => Math.max(a, c.totalWeight), 0),
        minWeight = children.reduce((a, c) => Math.min(a, c.totalWeight), 0xffffffff),
        withMax = children.filter((c) => c.totalWeight === maxWeight),
        withMin = children.filter((c) => c.totalWeight === minWeight);
    
    if (withMax.length === withMin.length) {
      return root;
    }
        
    let unbalanced = (withMax.length === 1 ? withMax : withMin)[0];
    
    return Day07.findUnbalancedChild(unbalanced, tower);
  },
  
  Part1: (input) => {
    return Day07.findRoot(Day07.parseList(input)).name;
  },
  
  Part2: (input) => {
    let tower = Day07.parseList(input),
        root = Day07.findRoot(tower);
    
    Day07.setTotalWeights(root, tower);
    
    let unbalanced = Day07.findUnbalancedChild(root, tower),
        parentOfUnbalanced = Day07.findParent(unbalanced, tower),
        firstSibling = parentOfUnbalanced.children
          .map((n) => Day07.findDisc(n, tower))
          .filter((c) => c.totalWeight !== unbalanced.totalWeight)[0],
        neededWeight = unbalanced.weight - (unbalanced.totalWeight - firstSibling.totalWeight);

    return neededWeight;
  }
};