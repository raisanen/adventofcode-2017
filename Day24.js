const parseComponent = a => a.split('/').map(n => +n);

const solve = (inp) => {
  let components = inp.split(/\n+/).map(l => {
        let [a, b] = parseComponent(l);
        return [a, b, l];
      }),
      starts = components.filter(c => c[0] === 0 || c[1] === 0),
      found = [];
  
  const findNext = (curr, used, lastMatch = 0) => {
    let match = curr[0] === lastMatch ? curr[1] : curr[0],
        next = components.filter(c => (c[0] === match || c[1] === match) && used.indexOf(c[2]) < 0),
        currBridge = {bridge: used.join('--'), score: parseComponent(used.join('/')).reduce((a,c) => a+c)};
        
    found.push(currBridge);
    next.forEach(n => findNext(n, used.concat(n[2]), match))
  };
  
  starts.forEach(s => findNext(s, [s[2]], 0));
  
  /// A:
  console.log('A:', found.sort((a,b) => b.score - a.score)[0]);
  
  /// B:
  let longestLength = found.map(b => b.bridge.split('/').length)
      .sort((a,b) => b - a)[0],
      strongestLongest = found.filter(f => f.bridge.split('/').length === longestLength).sort((a, b) => b.score - a.score)[0];
      
  console.log('B:', strongestLongest);
};