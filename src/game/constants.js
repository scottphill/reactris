const COLORS = {
    EMPTY: 0,
    BLUE: 1,
    GREEN: 2,
    RED: 3
};

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

export { COLORS, SHAPES };