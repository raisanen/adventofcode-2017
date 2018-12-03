const Day05 = {  
  Part1: (input) => {
    let memArr = input.split(/\s+/).map((s) => +s);
    for (let ptr = 0, step = 1; ; step++) {
      ptr += memArr[ptr]++;
      
      if (ptr < 0 || ptr >= memArr.length) {
        return step;
      }
    }
  },
  Part2: (input) => {
    let memArr = input.split(/\s+/).map((s) => +s);
    for (let ptr = 0, step = 1; ; step++) {
      ptr += memArr[ptr] >= 3 ? memArr[ptr]-- : memArr[ptr]++;
      
      if (ptr < 0 || ptr >= memArr.length) {
        return step;
      }
    }    
  }
};