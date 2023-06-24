import React, { memo, useRef } from 'react';

const Square = props => {
  const count = useRef(0);
  count.current++;

  const value = props.square ? props.square : 0;
  return(
    <span className={`square square-${value}`}></span>
  );
};

export default memo(Square);
