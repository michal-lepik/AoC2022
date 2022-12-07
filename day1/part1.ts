import fs from 'fs';

const data = fs.readFileSync('day1/input', 'utf8').split('\n\n');

const mostCaloriesCarried = data.reduce((currentHighestCalories, carriedFood) => {
    const foodCarried = carriedFood.split('\n').map(Number);
    const totalCalories = foodCarried.reduce((sumOfCalories, calories) => sumOfCalories + calories, 0);

    return totalCalories > currentHighestCalories ? totalCalories : currentHighestCalories;
}, 0);

console.log(mostCaloriesCarried);
