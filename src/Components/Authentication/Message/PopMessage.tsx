import type { FC } from "react";

import "./style.scss";

interface PopupMessageProps {
  message: string | null;
}

export const PopupMessage: FC<PopupMessageProps> = ({ message }) => (
  <div className={`pop-message${message ? "" : " pop-message_hide"}`}>
    <div className="pop-message__background">
      <div className="pop-message__wrapper">{message}</div>
    </div>
  </div>
);
