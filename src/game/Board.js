import React, { memo, useEffect, useRef } from 'react';
import { useBoard } from './UseBoard'; // Custom hook for managing the game board logic.
import Row from './Row'; // Custom component to render a row of Tetris blocks.

function Board() {
  const [view, score, onKeyDown] = useBoard();

  // Create a reference to the board element for focusing.
  const eBoard = useRef();

  useEffect(() => {
    eBoard.current.focus(); // Focus the board element to enable keyboard input.
  }, []);

  // Render the game board and score display.
  return (
    <div ref={eBoard} className='board' tabIndex={0} onKeyDown={onKeyDown}>
      <div>
        <span className='score-label'>Score:</span>
        <span className='score-label'>{score.toLocaleString()}</span>
      </div>
      {/* Iterate through each row in the view and render Row components */}
      {view.map((row, index) =>
        <Row row={row} key={index}/>
      )}
    </div>
  );
}

// Memoize the Board component to optimize re-renders.
export default memo(Board);
