import fs from 'fs';

const getVisibleTreesCount = (currentTreeValue: number, trees: number[]): number => {
    let count = 0;

    for (let i = 0; i < trees.length; i++) {
        count += 1;

        if (trees[i] >= currentTreeValue) {
            break;
        }
    }

    return count;
};

const treeMap = fs
    .readFileSync('day8/input', 'utf8')
    .split('\n')
    .map((row) => row.split('').map(Number));

let highestScore = 4;

for (let x = 1; x < treeMap.length - 1; x++) {
    for (let y = 1; y < treeMap[x].length - 1; y++) {
        const currentTree = treeMap[x][y];

        const topTreeMap = treeMap.slice(0, x);
        const bottomTreeMap = treeMap.slice(x + 1);

        const bottomTrees = bottomTreeMap.map((row) => row[y]);
        const rightTrees = treeMap[x].slice(y + 1);

        const topTrees = topTreeMap.map((row) => row[y]).reverse();
        const leftTrees = treeMap[x].slice(0, y).reverse();

        const scenicScore = [topTrees, bottomTrees, leftTrees, rightTrees].reduce(
            (score, treeRow) => score * getVisibleTreesCount(currentTree, treeRow),
            1,
        );

        if (scenicScore > highestScore) {
            highestScore = scenicScore;
        }
    }
}

console.log(highestScore);
