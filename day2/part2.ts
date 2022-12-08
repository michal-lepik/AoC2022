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
            return choiceValues.rock;

        case 'B':
            return choiceValues.paper;

        case 'C':
            return choiceValues.scissors;

        default:
            return 0;
    }
};

const getOutcomeValue = (outcome: string): number => {
    switch (outcome) {
        case 'X':
            return outcomeValues.loss;

        case 'Y':
            return outcomeValues.draw;

        case 'Z':
            return outcomeValues.win;

        default:
            return 0;
    }
};

const getRequiredPlayersChoiceValue = (
    opponentChoiceValue: number,
    desiredOutcomeValue: number,
): number => {
    switch (desiredOutcomeValue) {
        case outcomeValues.draw:
            return opponentChoiceValue;

        case outcomeValues.loss:
            return (opponentChoiceValue + 2) % 3 || 3;

        case outcomeValues.win:
            return (opponentChoiceValue + 1) % 3 || 3;

        default:
            return 0;
    }
};

const totalScore = data.reduce((score, roundInput) => {
    const [opponentsChoice, desiredOutcome] = roundInput.split(' ');

    const opponentsChoiceValue = getChoiceValue(opponentsChoice);
    const desiredOutcomeValue = getOutcomeValue(desiredOutcome);

    const requiredPlayersChoiceValue = getRequiredPlayersChoiceValue(
        opponentsChoiceValue,
        desiredOutcomeValue,
    );

    return score + requiredPlayersChoiceValue + desiredOutcomeValue;
}, 0);

console.log(totalScore);
