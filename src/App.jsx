import { useState } from "react";
import confetti from "canvas-confetti";
import { TURNS, WINNER_COMBOS } from "./constants";
import { Square } from "./compenents/Square";
import { WinnerModal } from "./compenents/WinnerModal";
// import { updateBoard } from "./logic/boardLogic"

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const getWinner = (handleNewBoard) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        handleNewBoard[a] &&
        handleNewBoard[a] === handleNewBoard[b] &&
        handleNewBoard[a] === handleNewBoard[c]
      ) {
        return handleNewBoard[a];
      }
    }
    return null;
  };

  const checkEndGame = (handleNewBoard) => { 
    return handleNewBoard.every(square => square !== null);
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turn === TURNS.X? TURNS.O : TURNS.X);
    setWinner(null);
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const checkWinner = getWinner(newBoard);
    if (checkWinner) {
      setWinner(checkWinner);
      confetti();
    }
    else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}> Reset </button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
