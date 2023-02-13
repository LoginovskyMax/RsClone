import type { FC } from "react";
import { useEffect, useState } from "react";

import Modal from "../common/Modal";

import ForgotPass from "./Forgot";
import { PopupMessage } from "./Message/PopMessage";
import ResetPass from "./Reset";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface AuthenticationModalProps {
  setModalClosed: () => void;
}

const MSG_TIMEOUT = 2000;

enum authWindow {
  login,
  registr,
  forgot,
  reset,
}

const AuthenticationModal: FC<AuthenticationModalProps> = ({
  setModalClosed,
}) => {
  const resetToken = new URLSearchParams(window.location.search).get(
    "resetToken"
  );

  const [windowVisible, setWindowVisible] = useState<authWindow>(
    resetToken ? authWindow.reset : authWindow.login
  );
  const [infoMgs, setInfoMsg] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (!infoMgs) return;
      setInfoMsg(null);
      setModalClosed();

      if (windowVisible === authWindow.reset) {
        window.location.search = "";
      }
    }, MSG_TIMEOUT);
  }, [infoMgs]);

  return (
    <>
      <PopupMessage message={infoMgs} />
      <Modal setModalClosed={setModalClosed} title="Authentication">
        {windowVisible === authWindow.login && (
          <SignIn
            setModalClosed={setModalClosed}
            setSignInModalOpened={() => {
              setWindowVisible(authWindow.registr);
            }}
            setForgotOpened={() => {
              setWindowVisible(authWindow.forgot);
            }}
          />
        )}
        {windowVisible === authWindow.registr && (
          <SignUp
            setModalClosed={setModalClosed}
            setSignInModalOpened={() => {
              setWindowVisible(authWindow.login);
            }}
            setForgotOpened={() => {
              setWindowVisible(authWindow.forgot);
            }}
          />
        )}
        {windowVisible === authWindow.forgot && (
          <ForgotPass
            setInfoMsg={setInfoMsg}
            setSignInModalOpened={() => {
              setWindowVisible(authWindow.login);
            }}
          />
        )}
        {windowVisible === authWindow.reset && (
          <ResetPass setInfoMsg={setInfoMsg} resetToken={resetToken ?? ""} />
        )}
      </Modal>
    </>
  );
};

export default AuthenticationModal;
