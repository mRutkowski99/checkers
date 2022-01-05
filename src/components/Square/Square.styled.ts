import styled from "styled-components";

interface IPros {
  dark: boolean;
  pointerCursor: boolean;
  selected: boolean;
  possibleCapture: boolean;
  active: boolean;
}

export const StyledSquare = styled.div`
  width: 7rem;
  aspect-ratio: 1;
  background-color: ${({ dark }: IPros) =>
    dark ? "rgba(108,64,35,255)" : "rgba(239,164,60,255)"};
  display: flex;
  justify-content: center;
  align-items: center;
  outline: solid 3px transparent;
  outline-offset: -3px;
  ${({ possibleCapture }) => possibleCapture && "outline-color: red;"}
  cursor: ${({ pointerCursor }) => (pointerCursor ? "pointer" : "default")};
  transition: all 0.2s;
  position: relative;

  ${({ active }) =>
    active &&
    `&::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }`}

  & > div {
    ${({ selected }) =>
      selected &&
      "transform: scale(1.1) translateY(-5px); box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.5)"}
  }
`;
