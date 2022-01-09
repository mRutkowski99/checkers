import Button from "../../Button/Button";
import { BtnContainer } from "../../../utilities/styleUtils.styled";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import gameActions from "../../../store/gameSlice";
import modalActions from "../../../store/modalSlice";
import { useEffect } from "react";

const Result = () => {
  const dispatch = useDispatch();
  const result = useSelector((state: RootState) => state.game.result);
  const { red: redName, black: blackName } = useSelector(
    (state: RootState) => state.modal.playerNames
  );
  let paragraph = "";

  console.log(result);

  useEffect(() => {
    if (!result) return;
    dispatch(modalActions.open("result"));

    if (result === "draw") paragraph = "Draw!";
    if (result === "red") paragraph = `${redName} wins!`;
    if (result === "black") paragraph = `${blackName} wins!`;
  }, [result]);

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
