import type { FC } from "react";
import { memo } from "react";

import "./style.scss";

import Button from "../../common/Button";
import Modal from "../../common/Modal";
import languageStore from "../../../store/language";

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
  const { isEn } = languageStore()
  if (!isModalClosed) {
    return <Modal setModalClosed={setModalClosed} title="Finished">
      <div className="finish">
        <p className="finish__title">{isEn ? "Cчет : " : "Score : "} {points}</p>
        <Button onClick={reset}>Reset</Button>
      </div>
    </Modal>
  }  else return null
}
 

export default memo(FinishModal);
