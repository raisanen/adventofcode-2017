const day8 = (input) => {
  const registers = {}; 
  const instructions = input.split(/\n/).map((l) => l.split(/\s+/));
  const checks = {
    '>':  (a, b) => a > b,
    '<':  (a, b) => a < b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '==': (a, b) => a == b,
    '!=': (a, b) => a != b
  };
  const insts = {
    'inc': (reg, value) => registers[reg] += value,
    'dec': (reg, value) => registers[reg] -= value
  };
  
  let maxEver = -1;
  
  const getorupdate = (reg, inst=null, value=0) => {
    if (typeof registers[reg] === 'undefined') {
      registers[reg] = 0;
    }
    if (inst !== null) {
      insts[inst](reg, value);
    }
    if (registers[reg] > maxEver) {
      maxEver = registers[reg];
    }
    return registers[reg];
  };
  
  instructions.forEach((l) => {
    let [regToUpdate, inst, val, dummy, regToCheck, check, valueToCheck] = l,
        regToCheckValue = getorupdate(regToCheck);
    val = parseInt(val);
    valueToCheck = parseInt(valueToCheck);
    
    if (typeof checks[check] !== 'undefined' && checks[check](regToCheckValue, valueToCheck)){
      getorupdate(regToUpdate, inst, val);
    }
  });
  console.log('A:', Object.values(registers).reduce((a, c) => Math.max(a,c)), 'B:', maxEver);
};