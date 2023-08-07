import React, { memo } from 'react';
import Square from './Square';

/**
 * Render a row of Tetris blocks.
 * @param {Object} props - React props object.
 * @param {Array} props.row - The row of squares to render.
 */
const Row = props => {
  return(
    <span className='row'>
      {/* Iterate through each square in the row and render Square components */}
      {props.row.map( (square, index) =>
        <Square square={square} key={index}/>
      )}
    </span>
  );
};

export default memo(Row);
