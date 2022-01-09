import Button from "../../Button/Button";
import { BtnContainer } from "../../../utilities/styleUtils.styled";
import { useDispatch } from "react-redux";
import modalActions from "../../../store/modalSlice";

const Rules = () => {
  const dispatch = useDispatch();

  const clickHandler = () => dispatch(modalActions.close());

  return (
    <>
      <ul>
        <li>
          Checkers is played by two opponents, on opposite sides of the
          gameboard. One player has the dark pieces and the other has the red
          pieces. Players alternate turns and they may not move an opponent's
          piece.
        </li>
        <li>
          A move consists of moving a piece diagonally (on dark squares) to an
          adjacent unoccupied square. If the adjacent square contains an
          opponent's piece, and the square immediately beyond it is vacant, the
          piece may be captured (and removed from the game) by jumping over it.
        </li>
        <li>
          Capturing more than one piece in single move is allowed. Captures are
          optional and after that piece may change direction.
        </li>
        <li>Pawn may move only forwards.</li>
        <li>
          When a pawn reaches the fahrest row forward is promoted to the king.
        </li>
        <li>King may move not only forwards but also backwards.</li>
        <li>
          If in 15 consecutive moves any piece has not been captured it results
          a draw.
        </li>
        <li>
          A player wins if opponent has no more pieces on board or has no legal
          moves.
        </li>
      </ul>
      <BtnContainer>
        <Button onClick={clickHandler}>Close</Button>
      </BtnContainer>
    </>
  );
};

export default Rules;
