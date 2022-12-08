import fs from 'fs';

const data = fs.readFileSync('day3/input', 'utf8').split('\n');

const getPriorityValue = (char: string): number => {
    const asciiCode = char.charCodeAt(0);

    if (asciiCode < 97) {
        return asciiCode - 38;
    } else {
        return asciiCode - 96;
    }
};

const items = data.reduce((listOfItems: string[], rucksackData: string) => {
    const rucksackContent = rucksackData.split('');
    const rucksackCenter = rucksackContent.length / 2;

    const firstHalf = rucksackContent.slice(0, rucksackCenter);
    const secondHalf = rucksackContent.slice(rucksackCenter);

    const repeatedItem = firstHalf.find((firstHalfItem) => secondHalf.includes(firstHalfItem));

    return repeatedItem ? [...listOfItems, repeatedItem] : listOfItems;
}, []);

const sumOfPriorities = items.reduce(
    (sum: number, currentItem: string) => sum + getPriorityValue(currentItem),
    0,
);

console.log(sumOfPriorities);
