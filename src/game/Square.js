import React, { memo, useRef } from 'react';

/**
 * Render a Tetris block.
 * @param {Object} props - React props object.
 * @param {number} props.square - The value of the square.
 */
const Square = props => {
  const count = useRef(0);
  count.current++;

  const value = props.square ? props.square : 0; // If the square is empty, set the value to 0.
  return(
    // Add a class to the square element based on the value.
    // This will allow us to style the square based on the value.
    <span className={`square square-${value}`}></span>
  );
};

export default memo(Square);
