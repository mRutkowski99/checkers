import { FunctionComponent, useState } from "react";
import ReactDOM from "react-dom";
import * as Style from "./Modal.styled";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import Rules from "../ModalContent/Rules/Rules";
import Reset from "../ModalContent/Reset/Reset";
import NewGame from "../ModalContent/NewGame/NewGame";
import Result from "../ModalContent/Result/Result";

interface IProps {
  modalContent: string | FunctionComponent;
}

const Overlay = ({ modalContent }: IProps) => {
  return (
    <Style.Overlay>
      <Style.Modal>
        <Style.ModalBar />
        <Style.ModalContent>
          {modalContent === "rules" && <Rules />}
          {modalContent === "reset" && <Reset />}
          {modalContent === "new-game" && <NewGame />}
          {modalContent === "result" && <Result />}
        </Style.ModalContent>
      </Style.Modal>
    </Style.Overlay>
  );
};

const overlayElement = document.getElementById("overlay") as Element;

const Modal = () => {
  const content = useSelector((state: RootState) => state.modal.content);

  return (
    <>
      {ReactDOM.createPortal(
        <Overlay modalContent={content} />,
        overlayElement
      )}
    </>
  );
};

export default Modal;
