import { StyledSquare } from "./Square.styled";
import Pawn from "../Pawn/Pawn";

interface IProps {
  dark: boolean;
  id: number;
  isEmpty: boolean;
  pawnColor: string;
  isKing: boolean;
  active: boolean;
}

function Square({ dark, id, isEmpty, pawnColor, isKing, active }: IProps) {
  return (
    <StyledSquare
      dark={dark}
      pointerCursor={!isEmpty}
      clicked={false}
      active={active}
    >
      {!isEmpty && <Pawn color={pawnColor} isKing={isKing} />}
    </StyledSquare>
  );
}

export default Square;
