import { useState, useMemo } from "react";
import { checkIfCurrentPlayerHasWonV2 } from "./helpers";
import { Player } from "./constants";

export const useBoard = ({ defautPlayer, row, col }) => {
  const totalMoves = useMemo(() => row * col, [row, col]);

  const defaultWinningState = () => ({
    rowState: [...Array(row).fill(0)],
    colState: [...Array(row).fill(0)],
    diagnols: [0, 0]
  });

  const defaultCells = () =>
    new Array(row).fill("").map(() => new Array(col).fill(""));

  const [moves, setMoves] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(defautPlayer);
  const [cellArr, setCellArr] = useState(defaultCells);
  const [winner, setWinner] = useState(null);
  const [isBoardDisabled, setIsBoardDisabled] = useState(false);

  const [currentWinnigState, setCurrentWinningState] = useState(
    defaultWinningState
  );

  const updateCell = (cRow, cCol) => {
    setMoves((prevMoves) => prevMoves + 1);
    if (cellArr[cRow][cCol] !== "" || isBoardDisabled) return;

    const temp = [...cellArr];
    temp[cRow][cCol] = currentPlayer;

    setCellArr(temp);
    const { isWinner, state } = checkIfCurrentPlayerHasWonV2(
      row,
      cRow,
      cCol,
      currentPlayer,
      currentWinnigState
    );
    if (isWinner) {
      setIsBoardDisabled(true);
      setWinner(`Player ${currentPlayer} has won the game`);
      return;
    } else if (moves === totalMoves - 1) {
      setIsBoardDisabled(true);
      setWinner(`It is a tie`);
    }
    setCurrentWinningState({ ...state });
    setCurrentPlayer(() => (currentPlayer === Player.X ? Player.O : Player.X));
  };

  const onResetClickHandler = () => {
    setCellArr(defaultCells);
    setWinner(null);
    setIsBoardDisabled(false);
    setMoves(0);
    setCurrentWinningState(defaultWinningState);
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
