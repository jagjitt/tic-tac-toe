import "./styles.css";
import Board from "./Board";

export default function App() {
  return (
    <div className="App">
      <h1 style={{ fontFamily: "fantasy" }}>Tic Tac Toe</h1>
      <Board row={3} col={3} />
    </div>
  );
}
