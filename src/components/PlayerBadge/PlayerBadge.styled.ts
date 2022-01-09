import styled from "styled-components";

interface IProps {
  color: string;
  isActive: boolean;
}

export const StyledPlayerBadge = styled.div`
  width: 25rem;
  padding: 1rem;
  border: solid 1px #000;
  background-color: #fff;
  border-color: ${({ isActive, color }: IProps) => (isActive ? color : "#000")};
  box-shadow: ${({ isActive, color }: IProps) =>
    isActive ? "0 .5rem 2rem " + color : "none"};
  border-radius: 0.5rem;
  color: ${({ isActive }: IProps) => (isActive ? "#000" : "#484848")};
  transform: ${({ isActive }: IProps) => (isActive ? "scale(1.1)" : "none")};

  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: all 0.2s;

  h2 {
    text-transform: uppercase;
    font-weight: 700;
  }

  h3 {
    font-weight: 400;
    font-size: 2rem;
  }

  & > p {
    margin-top: 1rem;
  }
`;
