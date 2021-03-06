import Button from "../../Button/Button";
import { BtnContainer } from "../../../helpers/styleUtils.styled";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import gameActions from "../../../store/gameSlice";
import modalActions from "../../../store/modalSlice";

const Result = () => {
  const dispatch = useDispatch();
  const result = useSelector((state: RootState) => state.game.result);
  const { red: redName, black: blackName } = useSelector(
    (state: RootState) => state.settings.playerNames
  );
  let paragraph = "";

  if (result === "draw") paragraph = "Draw!";
  if (result === "red") paragraph = `${redName} wins!`;
  if (result === "black") paragraph = `${blackName} wins!`;

  const newGameHandler = () => dispatch(modalActions.open("new-game"));

  const resetGameHandler = () => {
    dispatch(gameActions.resetGame());
    dispatch(modalActions.close());
  };

  return (
    <>
      <p>{paragraph}</p>
      <BtnContainer>
        <Button onClick={newGameHandler}>New game</Button>
        <Button onClick={resetGameHandler}>Play again</Button>
      </BtnContainer>
    </>
  );
};

export default Result;
