import fs from 'fs';

const instructions = fs.readFileSync('day10/input', 'utf8').split('\n');

const screenWidth = 40;
const screenHeight = 6;

const output: string[] = [];

for (let cycle = 1, pointer = 0, signal = 0, register = 1; pointer < instructions.length; cycle++) {
    const screenPosition = (cycle - 1) % screenWidth;

    if (screenPosition >= register - 1 && screenPosition <= register + 1) {
        output.push('#');
    } else {
        output.push('.');
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

for (let i = 0; i <= screenHeight * screenWidth; i += 40) {
    console.log(output.slice(i, i + screenWidth).join(''));
}
