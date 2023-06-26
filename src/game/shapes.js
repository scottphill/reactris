const SHAPES = [
    {
        coordinates: [
            {x:0, y:0},
            {x:0, y:1},
            {x:1, y:0},
            {x:1, y:1}
        ],
        width: 2,
        height: 2,
        rotate: false
    },
    {
        coordinates: [
            {x:0, y:0},
            {x:0, y:1},
            {x:0, y:2},
            {x:0, y:3}
        ],
        width: 1,
        height: 4
    },
    {
        coordinates: [
            {x:0, y:0},
            {x:0, y:1},
            {x:0, y:2},
            {x:1, y:2}
        ],
        width: 1,
        height: 3
    }
];

export function randomShape() {
    return SHAPES[Math.floor(Math.random() * SHAPES.length)];
}