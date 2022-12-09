import fs from 'fs';

const [initialCrateSetupData, instructionsData] = fs.readFileSync('day5/input', 'utf8').split('\n\n');

const crateRowsData = initialCrateSetupData
    .split('\n')
    .slice(0, -1)
    .map((rawRowData) => {
        const crateValues: Array<string | null> = [];

        for (let i = 1; i < rawRowData.length; i += 4) {
            const crateValue = rawRowData[i] !== ' ' ? rawRowData[i] : null;
            crateValues.push(crateValue);
        }

        return crateValues;
    })
    .reverse();

const cratesData = crateRowsData[0]
    .map((_column, i) => crateRowsData.map((row) => row[i]))
    .map((cratesColumn) => cratesColumn.filter(Boolean));

const cratesAfterArrangement = instructionsData
    .split('\n')
    .reduce((cratesState, instructionsRawData) => {
        const newCratesState = [...cratesState];
        const [cratesToMoveCount, sourceColumn, targetColumn] = instructionsRawData
            .split(' ')
            .filter((_, i) => i % 2 === 1)
            .map(Number);

        const cratesToMove = newCratesState[sourceColumn - 1].splice(-cratesToMoveCount).reverse();
        newCratesState[targetColumn - 1] = [...newCratesState[targetColumn - 1], ...cratesToMove];

        return newCratesState;
    }, cratesData);

const message = cratesAfterArrangement
    .flatMap((crateColumn) => crateColumn[crateColumn.length - 1])
    .join('');

console.log(message);
