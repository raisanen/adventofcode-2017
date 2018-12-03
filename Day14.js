Array.prototype.reverseSegment = function (startIdx, length) {
  let endIdx = startIdx + length,
      subarr = this.slice(startIdx, endIdx <= this.length ? endIdx : this.length),
      firstSubLength = subarr.length;
  
  if (endIdx > this.length) {
    subarr = subarr.concat(this.slice(0, length - firstSubLength));
  }
  
  subarr = subarr.reverse();
  for (let i = startIdx, j = 0; i < endIdx; i++, j++) {
    this[i % this.length] = subarr[j];
  }
  
  return this;
};

Array.prototype.unique    = function () { return [...new Set(this)]; };
Array.prototype.numUnique = function () { return this.unique().length; };

const createList = (len)   => Array.apply(null, {length: len}).map(Function.call, Number);
const zeroPad4   = (input) => ('000' + input).slice(-4); 
const zeroPad2   = (input) => ('0'   + input).slice(-2);

const knottedHash = (input) => {
  let list = createList(256),
      inp = input.split('').map((c) => c.charCodeAt(0)).concat([17, 31, 73, 47, 23]),
      skip = 0,
      pos = 0;
      
  for (let i = 0; i < 64; i++) {
    inp.forEach((n) => {
        list.reverseSegment(pos, n);
        pos = (pos + n + skip) % list.length; 
        skip++;
    });
  }
  let dense = '';
  for (let i = 0; i < 256; i += 16) {
    dense += zeroPad2(list.slice(i, i + 16).reduce((a, c) => c ^ a).toString(16));
  }
  return dense;
};


const part1 = (input) => {
  let rows = [],
      used = 0;
      
  for (let i = 0; i < 128; i++) {
    let hash = knottedHash(`${input}-${i}`).split('')
      .map(h => zeroPad4(parseInt(h, 16).toString(2)))
      .join('');
    rows.push(hash);
    used += hash.match(/1/g).length;
  }
  
  console.log('A:', used);
};

const part2 = (input) => {
  let table = [],
      regions = {};
      
  for (let i = 0; i < 128; i++) {
    let cols = knottedHash(`${input}-${i}`).split('')
      .map(h => zeroPad4(parseInt(h, 16).toString(2)))
      .join('')
      .split('');
    table.push(cols);
  }
  
  const mkKey = (a, b) => `${a}:${b}`,
        numRows = table.length,
        numCols = table[0].length;
  
  const findNeighbours = (region, row, col) => {
    const find = (r) => (rw, cl) => {
      let vkey = mkKey(rw, cl);
      if (rw < numRows && rw >= 0 && cl < numCols && cl >= 0 
            && typeof regions[vkey] === 'undefined' 
            && table[rw][cl] !== '0'
      ) {
        regions[vkey] = r;
        findNeighbours(r, rw, cl);
      }
    };
    [[row+1, col], [row, col+1], [row-1, col], [row, col-1]]
      .forEach(([rr, cc]) => find(region)(rr, cc));
  };
  
  for (let row = 0, lastRegionFound = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let vkey = mkKey(row, col);
      if (typeof regions[vkey] === 'undefined' && table[row][col] !== '0') {
        regions[vkey] = ++lastRegionFound;
        findNeighbours(lastRegionFound, row, col);
      }
    }
  }
  console.log('B:', Object.values(regions).numUnique());
};