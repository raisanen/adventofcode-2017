const day9 = (input) => {
  const chars = input.split('');
  let groupN = 0,
    score = 0,
    layer = 0,
    inGarbage = false,
    inEscape = false,
    numGarbage = 0;
    
  for (let i = 0; i < chars.length; i++) {
    if (!inEscape) {
      if (chars[i] === '!') {
        inEscape = true;
      } else if (!inGarbage) {
        if (chars[i] === '{') {
          groupN++;
          layer++;
          score += layer;
        } else if (chars[i] === '}') {
          layer--;
        } else if (chars[i] === '<') {
          inGarbage = true;
        }
      } else if (chars[i] === '>') {
        inGarbage = false;
      } else {
        numGarbage++;
      }
    } else {
      inEscape = false;
    }
  }
  
  console.log('A:', score, ', B:', numGarbage);
};