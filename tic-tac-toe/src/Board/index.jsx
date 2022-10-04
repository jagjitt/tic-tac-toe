import React from "react";

import "./Board.css";
import { useBoard } from "./hooks";
import { Player } from "./constants";

const Board = ({ row = 3, col = 3 }) => {
  const { state, actions } = useBoard({
    defautPlayer: Player.X,
    row,
    col
  });
  const { currentPlayer, cellArr, winner, isBoardDisabled } = state;
  const { onResetClickHandler, updateCell } = actions;

  return (
    <>
      <h4 style={{ fontFamily: "monospace" }}>
        Current Player : Player {currentPlayer}
      </h4>

      {winner && (
        <>
          <h4 style={{ color: "green", fontFamily: "monospace" }}>{winner}</h4>{" "}
          <button onClick={onResetClickHandler}>Restart the Game</button>
        </>
      )}

      <div className={`board ${isBoardDisabled ? "disabled" : ""}`}>
        {cellArr.map((rowsArr, index) => {
          return (
            <div className="board-row" key={`row_${index}`}>
              {rowsArr.map((cell, colIndex) => (
                <Cell
                  key={colIndex}
                  value={cell}
                  onClickHnadler={() => updateCell(index, colIndex)}
                />
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export const Cell = ({ value, onClickHnadler }) => {
  return (
    <div className="cell" onClick={onClickHnadler}>
      {value}
    </div>
  );
};

export default Board;
