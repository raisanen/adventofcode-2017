const part1 = (code) => {
  const instructions = code.split(/\n+/).map(l => l.split(/\s+/)); 
  let registers = {},
      ptr = 0,
      numInst = {};
  
  const getOp = (op) => {
    if (op.match(/[a-h]/)) {
      if (typeof registers[op] === 'undefined') {
        registers[op] = 0;
      }
      return registers[op];
    } else {
      return +op;
    }
  };
  const instInvoked = (inst) => {
    if (typeof numInst[inst] === 'undefined') {
      numInst[inst] = 0;
    }
    numInst[inst]++;
  }

  const handleInst = ([inst, opA, opB]) => {
    const a = getOp(opA),
          b = getOp(opB);
    
    instInvoked(inst);
    
    console.log(`${inst} ${opA} (${a}) ${opB} (${b})`);
    
    switch (inst) {
      case 'set': registers[opA]  = b; break;
      case 'sub': registers[opA] -= b; break;
      case 'mul': registers[opA] *= b; break;
      case 'jnz':
        if (a !== 0) {
          ptr--;
          ptr += b;
        }
        break;
    }
  };
  
  for(let i = 0; ptr < instructions.length; i++) {
    handleInst(instructions[ptr]);
    ptr++;
  }
  
  console.log('A:', numInst.mul);
};

const part2 = () => {
  let a=1,d=0,e=0,f=0,g=0,h=0,
      b = (79 * 100) + 100000,
      c = b + 17000;
  
  do {
    f = 1;
    e = 2;
    for (d = 2; d * d <= b; d++) {
      if (b % d === 0) {
        f = 0;
        break;
      }
    }
    if (f == 0) {
      h++;
    }
    g  = b - c;
    b += 17;
  } while (g != 0);

  
  console.log('B:', h);
};