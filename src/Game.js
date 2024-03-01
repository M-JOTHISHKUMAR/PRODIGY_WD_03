// src/components/Game.js
import React, { useState } from 'react';
import Board from './Board';

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const xIsNext = stepNumber % 2 === 0;
  const current = history[stepNumber];

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = [...current.squares];

    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }

    currentSquares[i] = xIsNext ? 'X' : 'O';

    setHistory([...newHistory, { squares: currentSquares }]);
    setStepNumber(newHistory.length);
  };

  // const jumpTo = (step) => {
  //   setStepNumber(step);
  // };

  const renderMoves = () => {
    return (
      <div>
        <p>{`Player: ${xIsNext ? 'X' : 'O'}`}</p>
      </div>
    );
  };

  const winner = calculateWinner(current.squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        {renderMoves()}
      </div>
    </div>
  );
};

export default Game;
