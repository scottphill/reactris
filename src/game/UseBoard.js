import { useEffect, useState } from 'react';
import { useInterval } from './UseInterval';
import { randomShape } from './shapes';
import { COLORS } from './constants';

const NUM_ROWS =  20;
const NUM_COLS = 10;

function copyGrid(grid) {
    return grid.map(row => [...row]);    
}

function placeShapeIntoView(view, shape, position) {
    let result = view;

    shape.coordinates.forEach( coordinate => {
        const newX = coordinate.x + position.x;
        const newY = coordinate.y + position.y;

        if(newX < 0 || newY < 0 || newX >= NUM_COLS || newY >= NUM_ROWS)
            return;
        else
            result = fillPointInView(result, newX, newY, shape.color);
    });

    return result;
}

function fillPointInView(view, x, y, color) {
    // Doesn't update the view if the new position is already filled
    if(view[y][x])
        return view;

    // Makes a shallow copy of the view (but new copy of the row) and fills the 
    //   specified point.
    const result = [...view];
    result[y] = [...view[y]];
    result[y][x] = color;

    return result;
}

const createNewGrid = () => Array(NUM_ROWS).fill().map(() => Array(NUM_COLS).fill(0));

export function useBoard() {
    const [grid, setGrid] = useState(() => createNewGrid());
    const [shape, setShape] = useState(() => randomShape());
    const [position, setPosition] = useState({x: 0, y: 0});
    const [view, setView] = useState(() => placeShapeIntoView(grid, shape, position));
    const [score, setScore] = useState(0);

    useEffect(updateView, [grid, shape, position]);
    useEffect(removeFilledLines, [grid]);
    useInterval(tick, 600)

    function updateView() {
        const newView = placeShapeIntoView(grid, shape, position);
        setView(newView);
    }

    function tick() {
        if(!tryMoveShape(0, 1))
            insertNewShape();
    }

    function insertNewShape() {
        setGrid(placeShapeIntoView(grid, shape, position));
        setShape(randomShape());
        setPosition({x: 0, y: 0});
    }

    function rotateShape() {
        const tX = Math.floor(shape.width / 2);
        const tY = Math.floor(shape.height / 2);

        const newPoints = shape.coordinates.map( point => {
            let { x, y } = point;

            x -= tX;
            y -= tY;

            // cos 90 = 0, sin 90 = 1
            // x = x cos 90 - y sin 90 = -y
            // y = x sin 90 + y cos 90 = x
            let rX = -y;
            let rY = x;

            rX += tX;
            rY += tY;

            return {
                x: rX, 
                y: rY
            };
        });

        const newShape = {
            coordinates: newPoints,
            width: shape.width,
            height: shape.height,
            color: shape.color
        };

        if(isValidPosition(position, newShape))
            setShape(newShape);
    }

    const lineClearScores = {
        0: 0,
        1: 1000,
        2: 3000,
        3: 5000,
        4: 8000
    };

    function removeFilledLines() {
        const newGrid = copyGrid(grid);
        let earnedPoints = 0;
        let lineStreak = 0;

        const removeRow = (rowIndex) => {
            for (let y = rowIndex; y > 0; y--) {
                for (let x = 0; x < NUM_COLS - 1; x++) {
                    newGrid[y][x] = newGrid[y-1][x];
                }
            }

            for(let x = 0; x < NUM_COLS - 1; x++)
                newGrid[0][x] = COLORS.EMPTY;
        };

        for(let y = 0; y < NUM_ROWS; y++) {
            let isFullRow = true;

            for(let x = 0; x < NUM_COLS; x++) {
                if(newGrid[y][x] === COLORS.EMPTY) {
                    isFullRow = false;
                    break;
                }
            }

            if(isFullRow) {
                removeRow(y);
                lineStreak++;
            }
            else if (lineStreak) {
                earnedPoints += lineClearScores[lineStreak];
                lineStreak = 0;
            }
        }

        if(lineStreak)
            earnedPoints += lineClearScores[lineStreak];

        if(earnedPoints) {
            setGrid(newGrid);
            setScore( oldScore => oldScore + earnedPoints);
        }
    }

    const KEY_HANDLERS = {
        'ArrowLeft': () => tryMoveShape(-1, 0),
        'ArrowRight': () => tryMoveShape(1, 0),
        'ArrowUp': () => rotateShape(),
        'ArrowDown': () => tryMoveShape(0, 1)
    };

    function onKeyDown(event) {
        if(event.key && event.key in KEY_HANDLERS) {
            event.preventDefault();
            KEY_HANDLERS[event.key]();
        }
    }

    function tryMoveShape(xDiff, yDiff) {
        const newPosition = {
            x: position.x + xDiff,
            y: position.y + yDiff
        };

        if(!isValidPosition(newPosition, shape)) {
            return false;
        }
        else {
            setPosition(newPosition);
            return true;
        }
    }

    function isValidPosition(position, shape) {
        return shape.coordinates.every( coordinate => {
            const xPosition = coordinate.x + position.x;
            const yPosition = coordinate.y + position.y;

            return xPosition >= 0 && xPosition < NUM_COLS
                    && yPosition >= 0 && yPosition < NUM_ROWS
                    && grid[yPosition][xPosition] === COLORS.EMPTY;
        });
    }

    return[view, score, onKeyDown];
}