// Part 1:
const checksum = (str) => {
  let result = 0;
  str.split(/\n+/g).forEach((l) => {
    let nums = l.split(/\s+/g).map((s) => +s.replace(/^\s+|\s+$/g, ''));
    let max = nums.reduce((a, n) => Math.max(a, n));
    let min = nums.reduce((a, n) => Math.min(a, n));
    result += max - min;
  });
  
  return result;
};

// Part 2:
const checksum2 = (str) => {
  let result = 0;
  str.split(/\n+/g).forEach((l) => {
    let nums = l.split(/\s+/g).map((s) => +s).sort((a,b) => b-a);
    let divRes = 0;
    for (let i = 0; i < nums.length - 1; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] % nums[j] === 0) {
          divRes = nums[i] / nums[j];
          break;
        }
      }
    }
    result += divRes;
  });
  
  return result;
};