import Button from "../../Button/Button";
import { BtnContainer } from "../../../helpers/styleUtils.styled";
import { useDispatch } from "react-redux";
import modalActions from "../../../store/modalSlice";
import gameActions from "../../../store/gameSlice";

const Reset = () => {
  const dispatch = useDispatch();

  const cancelClickHandler = () => dispatch(modalActions.close());

  const resetClickHandler = () => {
    dispatch(gameActions.resetGame());
    dispatch(modalActions.close());
  };

  return (
    <>
      <p>Are you sure you want to reset the game? </p>
      <BtnContainer>
        <Button onClick={cancelClickHandler}>Cancel</Button>
        <Button onClick={resetClickHandler}>Reset</Button>
      </BtnContainer>
    </>
  );
};

export default Reset;
