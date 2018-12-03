const start = `.#./..#/###`;
const testInput = `../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`;

const parse = inp => inp.split('/');
const print = (...inp) => inp.forEach(i => i.split('/').forEach(l => console.log(l)));

const rotate = inp => {
  let lines = parse(inp).map(l => l.split('')),
      output = [],
      len = lines.length;
      
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (!output[j]) {
        output[j] = [];
      }
      output[j].push(lines[i][j]);
    }
  }
  
  return output.map(l => l.join('')).join('/');
};

const flipHoriz = inp => inp.split('').reverse().join('');
const flipVert  = inp => parse(inp).reverse().join('/');


const processGrid = (rules, numIt) => {
  let grid = ['.#.','..#','###'];
  
  const split = () =>  {
      let len = grid.length,
          num = len % 2 == 0 ? 2 : 3,
          subgrids = [];
      for (let i = 0; i < len; i += num) {
          for(let j = 0; j < len; j += num) {
              let str = '';
              for(var k = 0; k < num; k++) {
                  str += grid[i+k].substring(j, j+num) + '/';
              }
              subgrids.push(str.substr(0, str.length-1));
          }
      }
      return subgrids;
  };

  const transform = (inp) => {
    let newA = inp;
    for (let i = 0; i <= 4; i++) {
      if (rules.hasOwnProperty(newA)) {
        return rules[newA];
      }
      newA = flipHoriz(newA);
      if (rules.hasOwnProperty(newA)) {
        return rules[newA];
      }
      newA = flipVert(newA);
      if (rules.hasOwnProperty(newA)) {
        return rules[newA];
      }
      
      newA = rotate(newA);
    }
    return inp;
  };
  
  const join = (arr) => {
    let newGrid = [],
        num = Math.sqrt(arr.length),
        strlen = arr[0].match(/\//g).length + 1;
    
    for (let i = 0; i < arr.length; i += num) {
        for (let j = 0; j < strlen; j++) {
            let str = '';
            for(let k = 0; k < num; k++) {
                str += arr[i+k].split('/')[j];
            }
            newGrid.push(str);
        }
    }
    return newGrid;
  };
    
  for (let i = 0; i < numIt; i++) {
    grid = join(split().map(s => transform(s)));
  }

  return grid;
};

const solve = (inp) => {
  const rules = {};
  inp.split(/\n+/).forEach(l => {
    let [rule, sub] = l.split('=>').map(s => s.trim());
    rules[rule] = sub;
  });
  
  console.log('A:', processGrid(rules,  5).join('').replace(/[^#]/g, '').length);
  console.log('B:', processGrid(rules, 18).join('').replace(/[^#]/g, '').length);
};

solve(testInput);



