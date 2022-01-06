import { StyledBoard } from "./Board.styled";
import Square from "../Square/Square";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function Board() {
  const board = useSelector((state: RootState) => state.game.board);

  return (
    <StyledBoard>
      {board.map((row, rowIndex) => {
        return row.map((square, index) => {
          let dark = true;
          if (rowIndex % 2 !== index % 2) dark = false;

          return (
            <Square
              key={rowIndex + "/" + index}
              id={rowIndex + "/" + index}
              dark={dark}
              isEmpty={square === "-" || square === "a"}
              pawnColor={square[0] === "r" ? "red" : "black"}
              isKing={square.indexOf("k") !== -1}
              active={square === "a"}
            />
          );
        });
      })}
    </StyledBoard>
  );
}

export default Board;
