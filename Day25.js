const solve = (numSteps) => {
  let tape = [],
      currState = 'A',
      cursor = 0;
      
  const transitions = {
    A: {val: [1, 0], state: ['B', 'C'], cursor: [1, -1]},
    B: {val: [1, 1], state: ['A', 'D'], cursor: [-1, 1]},
    C: {val: [0, 0], state: ['B', 'E'], cursor: [-1, -1]},
    D: {val: [1, 0], state: ['A', 'B'], cursor: [1, 1]},
    E: {val: [1, 1], state: ['F', 'C'], cursor: [-1, -1]},
    F: {val: [1, 1], state: ['D', 'A'], cursor: [1, 1]}
  };
  
  for (let i = 0; i < numSteps; i++) {
    let currVal = tape[cursor] || 0;
    tape[cursor] = transitions[currState].val[currVal];
    cursor += transitions[currState].cursor[currVal];
    currState = transitions[currState].state[currVal];
  };

  console.log(Object.values(tape).reduce((a, c) => a + c, 0));
};