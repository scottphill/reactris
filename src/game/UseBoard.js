import { useEffect, useState } from 'react';
import { useInterval } from './UseInterval';
import { randomShape } from './shapes';

const NUM_ROWS =  20;
const NUM_COLS = 10;
const FILLED = 1;

function copyGrid(grid) {
    return grid.map(row => [...row]);    
}

function placeShapeIntoView(view, shape, position) {
    let result = view;

    shape.coordinates.forEach( coordinate => {
        const newX = coordinate.x + position.x;
        const newY = coordinate.y + position.y;

        if(x < 0 || y < 0 || x >= NUM_COLS || y >= NUM_ROWS)
            return;
        else
            result = fillPointInView(result, x, y);
    });

    return result;
}

function fillPointInView(view, x, y) {
    // Doesn't update the view if the new position is already filled
    if(view[y][x])
        return;

    // Makes a shallow copy of the view (but new copy of the row) and fills the 
    //   specified point.
    const result = [...view];
    result[y] = [...view[y]];
    result[y][x] = FILLED;

    return result;
}

createNewGrid = () => Array(NUM_ROWS).fill().map(() => Array(NUM_COLS).fill(0));

export function useBoard() {
    const [grid, setGrid] = useState(() => createNewGrid());
    const [shape, setShape] = useState(() => randomShape());
    const [position, setPosition] = useState({x: 0, y: 0});
    const [view, setView] = useState(() => placeShapeIntoView(grid, shape, position));
    const [score, setScore] = useState(0);

    useEffect(updateView, [grid, shape, position]);
    useEffect(removeFilledLines, grid);
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
        setPosition(0, 0);
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
            height: shape.height
        };

        if(isValidPosition(position, newShape))
            setShape(newShape);
    }

    function removeFilledLines() {
        const newGrid = copyGrid(grid);
        let earnedPoints = 0;
        let lineStreak = 0;

        const removeRow = (rowIndex) => {

        };

        for(let y = 0; y < NUM_ROWS; y++) {
            let isFullRow = true;

            for(let x = 0; x < NUM_COLS; x++) {
                if(newGrid[y][x] == FILLED) {
                    isFullRow = false;
                    break;
                }
            }

            if(isFullRow) {
                removeRow(y);
                lineStreak++;
            }
        }

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

        if(isValidPosition(newPosition, shape)) {
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
                    && grid[yPosition][xPosition] !== FILLED;
        });
    }

    return[view, score, onKeyDown];
}