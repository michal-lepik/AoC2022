import fs from 'fs';

const instructions = fs.readFileSync('day10/input', 'utf8').split('\n');

const cyclesToSum = [20, 60, 100, 140, 180, 220];

let signalStrengthsSums = 0;

for (let cycle = 1, pointer = 0, signal = 0, register = 1; pointer < instructions.length; cycle++) {
    if (cyclesToSum.includes(cycle)) {
        signalStrengthsSums += register * cycle;
    }

    if (signal !== 0) {
        register += signal;
        signal = 0;
        pointer++;

        continue;
    }

    const [command, value] = instructions[pointer].split(' ');

    if (command === 'noop') {
        pointer++;
        continue;
    }

    signal = Number(value);
}

console.log(signalStrengthsSums);
