import type { FC } from "react";
import { memo } from "react";

import "./style.scss";

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
}) =>
  isModalClosed ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  ) : (
    <Modal setModalClosed={setModalClosed} title="Finished">
      <div className="finish">
        <p className="finish__title">Score: {points}</p>
        <Button onClick={reset}>Reset</Button>
      </div>
    </Modal>
  );

export default memo(FinishModal);
