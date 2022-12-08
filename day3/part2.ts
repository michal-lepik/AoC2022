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

const groups: string[][] = [];
for (let i = 0; i < data.length; i += 3) {
    groups.push(data.slice(i, i + 3));
}

const badges = groups.reduce((listOfBadges: string[], groupData: string[]) => {
    const [firstRucksack, secondRucksack, thirdRucksack] = groupData.map((group) => group.split(''));

    const repeatedItem = firstRucksack.find(
        (firstHalfItem) =>
            secondRucksack.includes(firstHalfItem) && thirdRucksack.includes(firstHalfItem),
    );

    return repeatedItem ? [...listOfBadges, repeatedItem] : listOfBadges;
}, []);

const sumOfPriorities = badges.reduce(
    (sum: number, currentItem: string) => sum + getPriorityValue(currentItem),
    0,
);

console.log(sumOfPriorities);
