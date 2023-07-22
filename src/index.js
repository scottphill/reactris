import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Board from './game/Board'

function GameContainer() {
  return (
    <div className="game-container">
      <Board/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GameContainer/>
);
