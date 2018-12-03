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

const createList = (len) => Array.apply(null, {length: len}).map(Function.call, Number);

const part1 = (len, input) => {
  let list = createList(len),
      inp = input.split(/,\s*/).map(Number),
      skip = 0,
      pos = 0;
  
  inp.forEach((n) => {
    list.reverseSegment(pos, n);
    pos = (pos + n + skip++) % list.length; 
  });
  return list[0] * list[1];
};

const part2 = (input) => {
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
  let dense = [];
  for (let i = 0; i < 256; i += 16) {
    dense.push(list.slice(i, i + 16).reduce((a, c) => c ^ a));
  }

  return dense.map((d) => {
    let h = d.toString(16);
    return (h.length === 1 ? '0' : '') + h;
  }).join('');
};