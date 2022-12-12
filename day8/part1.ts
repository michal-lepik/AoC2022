import fs from 'fs';

const treeMap = fs
    .readFileSync('day8/input', 'utf8')
    .split('\n')
    .map((row) => row.split('').map(Number));

let visibleTreesCount = 2 * treeMap.length + 2 * treeMap[0].length - 4;

for (let x = 1; x < treeMap.length - 1; x++) {
    for (let y = 1; y < treeMap[x].length - 1; y++) {
        const currentTree = treeMap[x][y];

        const topTreeMap = treeMap.slice(0, x);
        const bottomTreeMap = treeMap.slice(x + 1);

        const topTrees = topTreeMap.map((row) => row[y]);
        const bottomTrees = bottomTreeMap.map((row) => row[y]);
        const leftTrees = treeMap[x].slice(0, y);
        const rightTrees = treeMap[x].slice(y + 1);

        const isTreeVisible = [topTrees, bottomTrees, leftTrees, rightTrees].some((trees) =>
            trees.every((tree) => tree < currentTree),
        );

        if (isTreeVisible) {
            visibleTreesCount++;
        }
    }
}

console.log(visibleTreesCount);
