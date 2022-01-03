import { StyledBoard } from "./Board.styled";
import Square from "../Square/Square";

function Board() {
  const BOARD = [
    ["bp", "-", "bp", "-", "bp", "-", "bp", "-"],
    ["-", "bp", "-", "bp", "-", "bp", "-", "bp"],
    ["bp", "-", "bp", "-", "bp", "-", "bp", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "rp", "-", "rp", "-", "rp", "-", "rp"],
    ["rp", "-", "rp", "-", "rp", "-", "rp", "-"],
    ["-", "rp", "-", "rp", "-", "rp", "-", "rp"],
  ];

  return (
    <StyledBoard>
      {BOARD.map((row, rowIndex) => {
        return row.map((square, index) => {
          const id = rowIndex * 8 + index;
          let dark = true;
          if (
            (rowIndex % 2 === 0 && index % 2 === 1) ||
            (rowIndex % 2 === 1 && index % 2 === 0)
          )
            dark = false;
          return (
            <Square
              key={id}
              id={id}
              dark={dark}
              isEmpty={square === "-" || square === "a"}
              pawnColor={square[0] === "r" ? "red" : "black"}
              isKing={square[1] === "k"}
              active={square === "a"}
            />
          );
        });
      })}
    </StyledBoard>
  );
}

export default Board;
