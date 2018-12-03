const tsv2lol = (input) => {
  return input.split(/\n+/g).map((line) => line.split(/\s+/g));
};

// Part1:
const part1 = (passwords) => {
  let lines = tsv2lol(passwords);
  return lines.filter((l) => {
    let seen = {};
    let uniq = l.filter((s) => {
      if (typeof seen[s] === 'undefined') {
        seen[s] = true;
        return true;
      }
      return false;
    });
    return uniq.length === l.length;
  }).length;
};

// Part2:
const part2 = (passwords) => {
  let lines = tsv2lol(passwords);
  return lines.filter((l) => {
    let seen = {};
    let uniq = l.filter((s) => {
      let skey = s.split('').sort().join('');
      if (typeof seen[skey] === 'undefined') {
        seen[skey] = true;
        return true;
      }
      return false;
    });
    return uniq.length === l.length;
  }).length;;
};