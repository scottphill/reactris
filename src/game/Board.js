import React, { memo, useEffect, useRef } from 'react';
import Row from './Row';

function Board() {
  const [display, score, onKeyDown] = useBoard();
  const eBoard = useRef();

  useEffect(() => {
    eBoard.current.focus();
  }, []);

  return (
    <div ref={eBoard} className='board' tabIndex={0} onKeyDown={onKeyDown}>
      <div>
        <span className='score-label'>Score:</span>
        <span className='score-label'>{score.toLocaleString()}</span>
      </div>
      {display.map( (row, index) =>
        <Row row={row} key={index}/>
      )}
    </div>
  );
}

export default memo(Board);
