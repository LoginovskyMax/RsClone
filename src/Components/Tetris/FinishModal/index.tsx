import type { FC } from "react";
import { memo } from "react";

import "./style.scss";

import languageStore from "../../../store/language";
import Button from "../../common/Button";
import Modal from "../../common/Modal";

interface IFinishModalProps {
  points: number;
  isModalClosed: boolean;
  setModalClosed: () => void;
  reset: () => void;
}

const FinishModal: FC<IFinishModalProps> = ({
  isModalClosed,
  setModalClosed,
  points,
  reset,
}) => {
  const { isEn } = languageStore();

  if (!isModalClosed) {
    return (
      <Modal
        setModalClosed={setModalClosed}
        title={isEn ? "Finished" : "Конец"}
      >
        <div className="finish">
          <p className="finish__title">
            {isEn ? "Cчет : " : "Score : "} {points}
          </p>
          <Button onClick={reset}>{isEn ? "Заново" : "Reset"}</Button>
        </div>
      </Modal>
    );
  }

  return null;
};

export default memo(FinishModal);
