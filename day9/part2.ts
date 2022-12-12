import fs from 'fs';

const instructions = fs.readFileSync('day9/input', 'utf8').split('\n');

type Coordinates = {
    x: number;
    y: number;
};

const ropeLength = 10;

const rope: Coordinates[] = Array(ropeLength).fill({ x: 0, y: 0 });
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
    const newHead = { ...rope[0] };

    switch (direction) {
        case 'U':
            newHead.y++;
            break;
        case 'D':
            newHead.y--;
            break;
        case 'R':
            newHead.x++;
            break;
        case 'L':
            newHead.x--;
            break;
        default:
            return;
    }

    rope[0] = newHead;
};

const getNewKnot = (knot: Coordinates, previousKnot: Coordinates) => {
    const newKnot: Coordinates = { ...knot };

    const xDiff = knot.x - previousKnot.x;
    const yDiff = knot.y - previousKnot.y;

    if (xDiff > 0) {
        newKnot.x--;
    } else if (xDiff < 0) {
        newKnot.x++;
    }

    if (yDiff > 0) {
        newKnot.y--;
    } else if (yDiff < 0) {
        newKnot.y++;
    }

    return newKnot;
};

for (let instruction of instructions) {
    const [direction, steps] = instruction.split(' ');

    [...Array(Number(steps)).keys()].forEach((_step) => {
        rope.forEach((knot, knotIndex) => {
            if (knotIndex === 0) {
                moveHead(direction);
                return;
            }

            const previousKnot = rope[knotIndex - 1];
            const shouldMoveKnot =
                Math.abs(knot.x - previousKnot.x) > 1 || Math.abs(knot.y - previousKnot.y) > 1;
            if (!shouldMoveKnot) {
                return;
            }

            const newKnot = getNewKnot(knot, previousKnot);
            rope[knotIndex] = newKnot;
        });

        addToTailLocations(rope[ropeLength - 1]);
    });
}

console.log(tailLocations.length);
