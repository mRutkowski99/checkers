import styled from "styled-components";

export const StyledButton = styled.button`
  outline: none;
  border: none;
  width: 16rem;
  padding: 1rem;
  font-size: 1.8rem;
  color: #fff;
  background-color: rgb(135, 68, 23);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(135, 68, 23, 100);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.1s;

  &:active {
    transform: translateY(3px);
    box-shadow: 0 0.25rem 0.5rem rgba(135, 68, 23, 100);
  }

  &:hover {
    background-color: rgb(161, 70, 10);
  }

  & > svg {
    fill: #fff;
    width: 2rem;
    height: 2rem;
  }
`;
