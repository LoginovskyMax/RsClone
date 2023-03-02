import { useEffect } from "react";

import { MESSAGES_EN, MESSAGES_RU } from "../../data/restMsgs";
import languageStore from "../../store/language";
import useStatusStore from "../../store/load-status";

import "./style.scss";

const MSG_TIMEOUT = 2000;

const PopupMessage = () => {
  const status = useStatusStore();

  const { isEn } = languageStore();

  useEffect(() => {
    setTimeout(() => {
      if (!status.message) return;
      status.setStatus({ isLoading: false, message: "" });
    }, MSG_TIMEOUT);
  }, [status]);

  return (
    <div className={`pop-message${status.message ? "" : " pop-message_hide"}`}>
      <div className="pop-message__background">
        <div className="pop-message__wrapper">
          {isEn ? MESSAGES_RU[status.message] : MESSAGES_EN[status.message]}
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;
