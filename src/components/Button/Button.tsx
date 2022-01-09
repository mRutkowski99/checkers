import { StyledButton } from "./Button.styled";

interface IProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick }: IProps) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
