import fs from 'fs';

const data = fs.readFileSync('day4/input', 'utf8').split('\n');

const fullyContainedPairsCount = data.reduce((pairCount, currentPair) => {
    const [firstStart, firstEnd, secondStart, secondEnd] = currentPair
        .split(',')
        .flatMap((range) => range.split('-'))
        .map(Number);

    const isPairContained =
        (firstStart <= secondStart && firstEnd >= secondEnd) ||
        (firstStart >= secondStart && firstEnd <= secondEnd);

    return isPairContained ? pairCount + 1 : pairCount;
}, 0);

console.log(fullyContainedPairsCount);
