const filterAndSum = (str, filter) => {
    var arr = str.split('').map((s) => +s);
    arr = arr.filter(filter);
    return arr.length ? arr.reduce((a, i) => a + i) : 0;
};

// Part 1:
const part1 = (str) => filterAndSum(str, (n, i, arr) => n === arr[(i + 1) % arr.length]);

// Part 2:
const part2 = (str) => filterAndSum(str, (n, i, arr) => n === arr[(i + (arr.length/2)) % arr.length]);