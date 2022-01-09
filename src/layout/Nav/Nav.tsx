import { StyledNav } from "./Nav.styled";
import Button from "../../components/Button/Button";
import { ReactComponent as RulesIcon } from "../../assets/question-mark-svgrepo-com.svg";
import { ReactComponent as ResetIcon } from "../../assets/reset-svgrepo-com.svg";

const Nav = () => {
  return (
    <StyledNav>
      <ul>
        <li>
          <Button onClick={() => {}}>
            <RulesIcon />
            <span>Rules</span>
          </Button>
        </li>
        <li>
          <Button onClick={() => {}}>
            <ResetIcon />
            <span>Reset Game</span>
          </Button>
        </li>
      </ul>
    </StyledNav>
  );
};

export default Nav;
