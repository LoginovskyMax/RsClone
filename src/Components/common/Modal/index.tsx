import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

import "./style.scss";

interface ModalProps {
  children: ReactNode;
  title: string;
  setModalClosed: () => void;
}

const Modal: FC<ModalProps> = ({ children, title, setModalClosed }) =>
  ReactDOM.createPortal(
    <div className="modal-background">
      <div className="modal-wrapper" onClick={setModalClosed} />
      <div className="modal">
        <div className="modal__header">
          <p className="modal__title">{title}</p>
          <FontAwesomeIcon
            icon={faXmark}
            className="modal__close-icon"
            onClick={setModalClosed}
          />
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>,
    document.body
  );

export default Modal;