import { StyledNav } from "./Nav.styled";
import Button from "../../components/Button/Button";
import { ReactComponent as RulesIcon } from "../../assets/question-mark-svgrepo-com.svg";
import { ReactComponent as ResetIcon } from "../../assets/reset-svgrepo-com.svg";
import { ReactComponent as NewGameIcon } from "../../assets/new-svgrepo-com.svg";
import { useDispatch } from "react-redux";
import modalActions from "../../store/modalSlice";

const Nav = () => {
  const dispatch = useDispatch();

  const rulesClickHandler = () => dispatch(modalActions.open("rules"));

  const resetClickHandler = () => dispatch(modalActions.open("reset"));

  const newGameHandler = () => dispatch(modalActions.open("new-game"));

  return (
    <StyledNav>
      <ul>
        <li>
          <Button onClick={rulesClickHandler}>
            <RulesIcon />
            <span>Rules</span>
          </Button>
        </li>
        <li>
          <Button onClick={resetClickHandler}>
            <ResetIcon />
            <span>Reset Game</span>
          </Button>
        </li>
        <li>
          <Button onClick={newGameHandler}>
            <NewGameIcon />
            <span>New Game</span>
          </Button>
        </li>
      </ul>
    </StyledNav>
  );
};

export default Nav;
