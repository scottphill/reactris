import React, { memo } from 'react';
import Square from './Square';

const Row = props => {
  return(
    <span className='row'>
      {props.row.map( (square, index) =>
        <Square square={square} key={index}/>
      )}
    </span>
  );
};

export default memo(Row);
