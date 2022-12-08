import fs from 'fs';

const data = fs.readFileSync('day2/input', 'utf8').split('\n');

const choiceValues = {
    rock: 1,
    paper: 2,
    scissors: 3,
};

const outcomeValues = {
    loss: 0,
    draw: 3,
    win: 6,
};

const getChoiceValue = (choice: string): number => {
    switch (choice) {
        case 'A':
        case 'X':
            return choiceValues.rock;

        case 'B':
        case 'Y':
            return choiceValues.paper;

        case 'C':
        case 'Z':
            return choiceValues.scissors;

        default:
            return 0;
    }
};

const getOutcomeOfChoices = (opponentsChoice: string, playersChoice: string): number => {
    const opponentsChoiceValue = getChoiceValue(opponentsChoice);
    const playersChoiceValue = getChoiceValue(playersChoice);

    const result = playersChoiceValue - opponentsChoiceValue;

    switch (result) {
        case 0:
            return outcomeValues.draw;

        case -2:
        case 1:
            return outcomeValues.win;

        case -1:
        case 2:
            return outcomeValues.loss;

        default:
            return 0;
    }
};

const totalScore = data.reduce((score, roundInput) => {
    const [opponentsChoice, playersChoice] = roundInput.split(' ');

    const playersChoiceValue = getChoiceValue(playersChoice);
    const outcomeValue = getOutcomeOfChoices(opponentsChoice, playersChoice);

    return score + playersChoiceValue + outcomeValue;
}, 0);

console.log(totalScore);
