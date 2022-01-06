import { StyledSquare } from "./Square.styled";
import Pawn from "../Pawn/Pawn";
import { useDispatch, useSelector } from "react-redux";
import gameActions from "../../store/gameSlice";
import { RootState } from "../../store/store";

interface IProps {
  dark: boolean;
  id: string;
  isEmpty: boolean;
  pawnColor: string;
  isKing: boolean;
  active: boolean;
}

function Square({ dark, id, isEmpty, pawnColor, isKing, active }: IProps) {
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.game.selected);
  const currentPlayer = useSelector(
    (state: RootState) => state.game.currentPlayer
  );
  const possibleCaptures = useSelector(
    (state: RootState) => state.game.possibleCaptures
  );

  const clickHandler = () => {
    if (!isEmpty && currentPlayer === pawnColor)
      dispatch(
        gameActions.clickPawn({ id: id, color: pawnColor, isKing: isKing })
      );

    if (isEmpty && active) dispatch(gameActions.selectMove({ id: id }));
  };

  return (
    <StyledSquare
      dark={dark}
      pointerCursor={(!isEmpty && currentPlayer === pawnColor) || active}
      active={active}
      possibleCapture={Object.values(possibleCaptures).flat().includes(id)}
      onClick={clickHandler}
      selected={id === selectedId}
    >
      {!isEmpty && <Pawn color={pawnColor} isKing={isKing} />}
    </StyledSquare>
  );
}

export default Square;
