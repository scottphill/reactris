import React, { memo, useEffect, useRef } from 'react';
import { useBoard } from './UseBoard';
import Row from './Row';

function Board() {
  const [view, score, onKeyDown] = useBoard();
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
      {view.map( (row, index) =>
        <Row row={row} key={index}/>
      )}
    </div>
  );
}

export default memo(Board);
