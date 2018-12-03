Array.prototype.mkKey = function () {
  return this.join('_');
};
Array.prototype.indexOfMaxValue = function () {
  return this.reduce((mx, x, i, arr) => x > arr[mx] ? i : mx, 0);
};
String.prototype.toIntArray = function () {
  return this.split(/\s+/).map((s) => +s);
};

const Day06 = {
  FindPeriod: (input, checkCallback) => {
    let inputArr = input.toIntArray();
    
    for(let cycle = 1, seen = {}; ; cycle++) {
      let maxInd = inputArr.indexOfMaxValue();
          blocks = inputArr[maxInd];
          
      seen[inputArr.mkKey()] = cycle;
          
      inputArr[maxInd] = 0;
      for (let ptr = (maxInd+1) % inputArr.length; blocks > 0; blocks--) {
        inputArr[ptr]++;
        ptr = (ptr + 1) % inputArr.length;
      }
      
      let res = checkCallback(inputArr, seen, cycle);
      if (res !== false) {
        return res;
      }
    }
    return 0;
  },
  Part1: (input) => {
    return Day06.FindPeriod(input, (arr, seen, cycle) => {
      if (seen[arr.mkKey()]) {
        return cycle;
      }
      return false;
    });
  },
  Part2: (input) => {
    return Day06.FindPeriod(input, (arr, seen, cycle) => {
      if (typeof seen[arr.mkKey()] !== 'undefined') {
        return (cycle + 1) - seen[arr.mkKey()];
      }
      return false;
    });
  }
};