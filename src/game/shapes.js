import { SHAPES, COLORS } from "./constants";

export function randomShape() {
    const randShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const randColor = COLORS[Object.keys(COLORS)[Math.floor(Math.random() * (Object.keys(COLORS).length - 1)) + 1]];
    randShape.color = randColor;
    return randShape;
}