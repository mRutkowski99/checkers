import { StyledPlayerBadge } from "./PlayerBadge.styled";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface IProps {
  player: string;
  color: string;
  name: string;
}

function PlayerBadge({ player, color, name }: IProps) {
  const currentPlayer = useSelector(
    (state: RootState) => state.game.currentPlayer
  );

  const captured = useSelector((state: RootState) => state.game.capturedPieces);

  return (
    <StyledPlayerBadge color={color} isActive={currentPlayer === player}>
      <h2>{player}</h2>
      <h3>{name}</h3>
      <p>Captured: {captured[player]}</p>
    </StyledPlayerBadge>
  );
}

export default PlayerBadge;
