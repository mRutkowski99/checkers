import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import gameActions from "../store/gameSlice";
import minimax from "../helpers/minmax";

const useAI = (player: string) => {
  const board = useSelector((state: RootState) => state.game.board);

  if (player === "red" || board.flat().includes("a")) return;

  setTimeout(() => {
    const { position: newBoard } = minimax(board, 5, true);
    const move = { piece: "", target: "" };

    if (newBoard) {
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (!newBoard[row][col].includes("b")) continue;

          if (board[row][col].includes("b") && newBoard[row][col] === "-")
            move.piece = [row, col].join("/");

          if (newBoard[row][col].includes("b") && board[row][col] === "-")
            move.target = [row, col].join("/");
        }
      }
    }

    console.log(newBoard);
  }, 1);
};

export default useAI;
