import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
  0% {
    transform: translateY(-3rem);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  width: 50vw;
  border-radius: 0.5rem;
  overflow: hidden;
  animation: ease-out 0.4s ${slideDown};
`;

export const ModalBar = styled.div`
  height: 3rem;
  background-color: rgb(135, 68, 23);
`;
export const ModalContent = styled.div`
  padding: 2rem;
  line-height: 1.6;
  background-color: #fff;
`;
