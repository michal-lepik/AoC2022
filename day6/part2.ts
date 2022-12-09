import fs from 'fs';

const buffer = fs.readFileSync('day6/input', 'utf8');

let pointer = 0;
for (; pointer <= buffer.length; pointer++) {
    const sequence = buffer.slice(pointer, pointer + 14);
    const isCorrect = new Set(sequence).size === sequence.length;

    if (isCorrect) {
        break;
    }
}

console.log(pointer + 14);
