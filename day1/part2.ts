import fs from 'fs';

const data = fs.readFileSync('day1/input', 'utf8').split('\n\n');

const caloriesCountLimit = 3;

const mostCaloriesCarried = data.reduce((highestCaloriesResults: number[], carriedFood) => {
    const foodCarried = carriedFood.split('\n').map(Number);
    const totalCalories = foodCarried.reduce((sumOfCalories, calories) => sumOfCalories + calories, 0);

    if (highestCaloriesResults.length < caloriesCountLimit) {
        return [...highestCaloriesResults, totalCalories];
    }

    const shouldReplaceResults = highestCaloriesResults.some((result) => result < totalCalories);
    if (!shouldReplaceResults) {
        return highestCaloriesResults;
    }

    const smallestResult = Math.min(...highestCaloriesResults);
    const filteredResults = highestCaloriesResults.filter((result) => result !== smallestResult);

    return [...filteredResults, totalCalories];
}, []);

const sumOfHighestResults = mostCaloriesCarried.reduce(
    (sumOfCalories, calories) => sumOfCalories + calories,
    0,
);

console.log(sumOfHighestResults);
