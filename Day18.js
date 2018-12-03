const part1 = (input) => {
  let registers = {},
      lastSound = 0,
      ptr = 0,
      i = 0;
  const code = input.split(/\n+/).map(l => l.split(/\s+/));
      
  const regorn = (x) => {
    return x.match && x.match(/^[a-z]$/) ? getreg(x) : +x;
  };
  const getreg = (r) => {
    if (typeof registers[r] === 'undefined') {
      registers[r] = 0;
    }
    return registers[r];
  };
  const setreg = (r, v) => registers[r] = regorn(v);
  
  const ops = {
    'snd': (x) => lastSound = regorn(x),
    'set': (r, x) => setreg(r, x),
    'add': (r, x) => setreg(r, getreg(r) + regorn(x)),
    'mul': (r, x) => setreg(r, getreg(r) * regorn(x)),
    'mod': (r, x) => setreg(r, getreg(r) % regorn(x)),
    'rcv': (r)    => getreg(r),
    'jgz': (r, y) => {
      if (getreg(r) > 0) {
        ptr += regorn(y);
      } else {
        ptr++;
      }
    }
  };
  for (ptr = 0; ptr < code.length && i < 1e5; i++) {
    let op = code[ptr],
        res = ops[op[0]](op[1], op[2]);
    
    if (op[0] === 'rcv' && res !== 0) {
      console.log('A:', lastSound);
      return;
    }
    
    if (op[0] !== 'jgz') {
      ptr++;
    }
  }
};

class Prg {
  registers = {}
  ptr = 0
  queue = []
  code = []
  id = 0
  sent = 0
  sibling = 0
  
  constructor(id, input) {
    this.id = id;
    this.code = input.split(/\n+/).map(l => l.trim().split(/\s+/));
  }
  
  setSibling(sibling) {
    this.sibling = sibling;
  }
  
  isStalled() {
    return this.code[this.ptr][0] === 'rcv' && this.queue.length <= 0;
  }
  isDone() {
    return this.ptr >= this.code.length - 1;
  }
  
  isStalledOrDone() {
    return this.isDone() || this.isStalled();
  }
  
  step() {
    const regorn = (x) => {
      return x.match && x.match(/^[a-z]$/) ? getreg(x) : +x;
    };
    const getreg = (r) => {
      if (typeof this.registers[r] === 'undefined') {
        this.registers[r] = r === 'p' ? this.id : 0;
      }
      return this.registers[r];
    };
    const setreg = (r, v) => this.registers[r] = regorn(v);
    const ops = {
      'snd': (x)    => { 
        this.sibling.queue.push(regorn(x));
        this.ptr++ 
        this.sent++;
      },
      'set': (r, x) => { setreg(r, x); this.ptr++ },
      'add': (r, x) => { setreg(r, getreg(r) + regorn(x)); this.ptr++ },
      'mul': (r, x) => { setreg(r, getreg(r) * regorn(x)); this.ptr++ },
      'mod': (r, x) => { setreg(r, getreg(r) % regorn(x)); this.ptr++ },
      'rcv': (r)    => {
        if (this.queue.length > 0) {
          this.registers[r] = this.queue.shift();
          this.ptr++ 
        }
      },
      'jgz': (r, y) => {
        if (regorn(r) > 0) {
          this.ptr += regorn(y);
        } else {
          this.ptr++;
        }
      }
    }
    
    ops[this.code[this.ptr][0]](this.code[this.ptr][1], this.code[this.ptr][2]);
  }
}

const part2 = (input) => {
  const programs = [new Prg(0, input), new Prg(1, input)];
  programs[0].setSibling(programs[1]);
  programs[1].setSibling(programs[0]);
  
  do {
    programs.forEach(p => {
      if (!p.isDone()) {
        p.step();
      }
    })
  } while (!programs.reduce((a, b) => a && b.isStalledOrDone(), true));
  
  console.log('B:', programs[1].sent);
};
