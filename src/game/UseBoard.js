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

    function updateView() {}
    function tick() {}
    function insertNewShape() {}
    function rotateShape() {}
    function removeFilledLines() {}
    function onKeyDown() {}
    function tryMoveShape() {}
    function isValidPosition() {}
}