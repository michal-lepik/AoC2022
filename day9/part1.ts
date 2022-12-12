import fs from 'fs';

const instructions = fs.readFileSync('day9/input', 'utf8').split('\n');

type Coordinates = {
    x: number;
    y: number;
};

const head: Coordinates = { x: 0, y: 0 };
const tail: Coordinates = { x: 0, y: 0 };
const tailLocations: Coordinates[] = [];

const addToTailLocations = (coordinates: Coordinates) => {
    const doesLocationAlreadyExist = tailLocations.some(
        ({ x, y }) => x == coordinates.x && y === coordinates.y,
    );

    if (!doesLocationAlreadyExist) {
        tailLocations.push(coordinates);
    }
};

const moveHead = (direction: string) => {
    switch (direction) {
        case 'U':
            return head.y++;
        case 'D':
            return head.y--;
        case 'R':
            return head.x++;
        case 'L':
            return head.x--;
        default:
            return;
    }
};

const moveTail = (direction: string) => {
    const newTail: Coordinates = { ...head };

    switch (direction) {
        case 'U':
            newTail.y--;
            break;
        case 'D':
            newTail.y++;
            break;
        case 'R':
            newTail.x--;
            break;
        case 'L':
            newTail.x++;
            break;
        default:
            return;
    }

    tail.x = newTail.x;
    tail.y = newTail.y;

    addToTailLocations(newTail);
};

for (let instruction of instructions) {
    const [direction, steps] = instruction.split(' ');

    [...Array(Number(steps)).keys()].forEach(() => {
        moveHead(direction);

        const shouldMoveTail = Math.abs(tail.x - head.x) > 1 || Math.abs(tail.y - head.y) > 1;
        if (!shouldMoveTail) {
            return;
        }

        moveTail(direction);
    });
}

console.log(tailLocations.length);
