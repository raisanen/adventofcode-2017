const part1 = (input, config='abcdefghijklmnop') => {
  let programs = config.split(''); //
  const dance = input.split(',');
  
  const moves = {
    's': a => {
      let n = +a;
      programs = programs.slice(-n).concat(programs.slice(0, programs.length - n));
    },
    'x': (a, b) => {
      let [n1, n2] = [+a, +b];
      let t = programs[n1];
      programs[n1] = programs[n2];
      programs[n2] = t;
    },
    'p': (a, b) => {
      moves.x(programs.indexOf(a), programs.indexOf(b));
    }
  }
  
  for (let i = 0; i < dance.length; i++) {
    let [d, mov, a, b] = dance[i].match(/([sxp])(\w+)\/?(\w+)?/);
    moves[mov](a, b);
  }
  
  return programs.join('');
};

const findPeriod = (input) => {
  const starting = 'abcdefghijklmnop';
  let   newperm = starting;
  
  for (let i = 1; ; i++) {
    newperm = part1(input, newperm);
    if (newperm === starting) {
      return i;
    }
  }
};

const part2 = (input) => {
  const starting = 'abcdefghijklmnop';
  let period = findPeriod(input),
      realN = 1e9 % period,
      newperm = starting;
  
  for (let i = 0; i < realN; i++) {
    newperm = part1(input, newperm);
  }
  return newperm;
};