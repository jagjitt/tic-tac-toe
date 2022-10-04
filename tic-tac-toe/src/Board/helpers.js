export const checkIfCurrentPlayerHasWonV2 = (
  rows,
  currentRow,
  currentCols,
  value,
  state
) => {
  console.log(rows, currentRow, currentCols, value, state);
  // diagCheck ; 0 -> left diagnol, 1 right diagnol
  const { rowState, colState, diagnols } = state;

  // for any rows and columns logic
  rowState[currentRow] += value === "X" ? +1 : -1;
  colState[currentCols] += value === "X" ? +1 : -1;

  // for left and right diagnol logic
  if (currentRow === currentCols) {
    diagnols[0] += value === "X" ? +1 : -1;
  }
  if (currentRow + currentCols === rows - 1) {
    diagnols[1] += value === "X" ? +1 : -1;
  }
  const isWinner =
    rowState.includes(rows) ||
    rowState.includes(-rows) ||
    colState.includes(-rows) ||
    colState.includes(rows) ||
    diagnols.includes(rows) ||
    diagnols.includes(-rows);

  return {
    isWinner,
    state: {
      rowState,
      colState,
      diagnols
    }
  };
};
