import { PawnOuter, PawnInner } from "./Pawn.styled";
import { ReactComponent as Crown } from "../../assets/crown-svgrepo-com.svg";

interface IProps {
  color: string;
  isKing: boolean;
}

function Pawn({ color, isKing }: IProps) {
  return (
    <PawnOuter color={color}>
      <PawnInner color={color}>{isKing && <Crown />}</PawnInner>
    </PawnOuter>
  );
}

export default Pawn;
