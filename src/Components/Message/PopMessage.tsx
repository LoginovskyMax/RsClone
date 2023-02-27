import { useEffect } from "react";

import useStatusStore from "../../store/load-status";

import "./style.scss";

const MSG_TIMEOUT = 2000;

const PopupMessage = () => {
  const status = useStatusStore();

  useEffect(() => {
    setTimeout(() => {
      if (!status.message) return;
      status.setStatus({ isLoading: false, message: "" });
    }, MSG_TIMEOUT);
  }, [status]);

  return (
    <div className={`pop-message${status.message ? "" : " pop-message_hide"}`}>
      <div className="pop-message__background">
        <div className="pop-message__wrapper">{status.message}</div>
      </div>
    </div>
  );
};

export default PopupMessage;
