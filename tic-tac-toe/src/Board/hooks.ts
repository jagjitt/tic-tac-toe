import { useState } from "react";
import { checkIfCurrentPlayerHasWonV2 } from "./helpers";
import { Player } from "./constants";

export const useBoard = ({ defautPlayer, row, col }) => {
  const totalMoves = row * col;

  const [moves, setMoves] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(defautPlayer);
  const [cellArr, setCellArr] = useState(() =>
    new Array(row).fill("").map(() => new Array(col).fill(""))
  );
  const [winner, setWinner] = useState(null);
  const [isBoardDisabled, setIsBoardDisabled] = useState(false);

  const [currentWinnigState, setCurrentWinningState] = useState(() => ({
    rowState: [...Array(row).fill(0)],
    colState: [...Array(row).fill(0)],
    diagnols: [0, 0]
  }));

  const updateCell = (cRow, cCol) => {
    setMoves((prevMoves) => prevMoves + 1);
    if (cellArr[cRow][cCol] !== "" || isBoardDisabled) return;

    const temp = [...cellArr];
    temp[cRow][cCol] = currentPlayer;

    setCellArr(temp);
    console.log(">>", currentWinnigState);
    const checkWinner = checkIfCurrentPlayerHasWonV2(
      row,
      cRow,
      cCol,
      currentPlayer,
      currentWinnigState
    );
    console.log(checkWinner);
    if (checkWinner.isWinner) {
      setIsBoardDisabled(true);
      setWinner(`Player ${currentPlayer} has won the game`);
      return;
    } else if (moves === totalMoves - 1) {
      setIsBoardDisabled(true);
      setWinner(`It is a tie`);
    }
    setCurrentWinningState({ ...checkWinner.state });
    setCurrentPlayer(() => (currentPlayer === "X" ? Player.O : Player.X));
  };

  const onResetClickHandler = () => {
    setCellArr(() =>
      new Array(row).fill("").map(() => new Array(col).fill(""))
    );
    setWinner(null);
    setIsBoardDisabled(false);
    setMoves(0);
  };

  return {
    state: {
      moves,
      currentPlayer,
      cellArr,
      winner,
      isBoardDisabled
    },
    actions: {
      setMoves,
      setCurrentPlayer,
      setCellArr,
      setWinner,
      setIsBoardDisabled,
      updateCell,
      onResetClickHandler
    }
  };
};
