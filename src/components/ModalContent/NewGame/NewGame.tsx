import { useState } from "react";
import { BtnContainer, Flex } from "../../../utilities/styleUtils.styled";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import { useDispatch } from "react-redux";
import modalActions from "../../../store/modalSlice";
import gameActions from "../../../store/gameSlice";

const NewGame = () => {
  const [redName, setRedName] = useState("Player 1");
  const [blackName, setBlackName] = useState("Player 2");
  const dispatch = useDispatch();

  const redNameHandler = (value: string) => setRedName(value);

  const blackNameHandler = (value: string) => setBlackName(value);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(modalActions.setNames({ redName, blackName }));
    dispatch(modalActions.close());
    dispatch(gameActions.resetGame());
  };

  return (
    <form onSubmit={submitHandler}>
      <Flex>
        <Input
          label="Red Player"
          placeholder="Player1"
          id="red-player"
          onChange={redNameHandler}
        />
        <Input
          label="Black Player"
          placeholder="Player2"
          id="black-player"
          onChange={blackNameHandler}
        />
      </Flex>
      <BtnContainer>
        <Button>Play</Button>
      </BtnContainer>
    </form>
  );
};

export default NewGame;
