import fs from 'fs';

const data = fs.readFileSync('day4/input', 'utf8').split('\n');

const overlappingPairsCount = data.reduce((pairCount, currentPair) => {
    const [firstStart, firstEnd, secondStart, secondEnd] = currentPair
        .split(',')
        .flatMap((range) => range.split('-'))
        .map(Number);

    const isPairOverlapping = !(firstEnd < secondStart || firstStart > secondEnd);

    return isPairOverlapping ? pairCount + 1 : pairCount;
}, 0);

console.log(overlappingPairsCount);
