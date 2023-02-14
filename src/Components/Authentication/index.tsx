import type { FC } from "react";
import { useEffect, useState } from "react";

import useStatusStore from "../../store/load-status";
import Modal from "../common/Modal";

import ForgotPass from "./Forgot";
import ResetPass from "./Reset";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface AuthenticationModalProps {
  setModalClosed: () => void;
}

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

  const { message } = useStatusStore();

  useEffect(() => {
    if (message) {
      setModalClosed();

      if (windowVisible === authWindow.reset) {
        window.location.search = "";
      }
    }
  }, [message]);

  return (
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
          setSignInModalOpened={() => {
            setWindowVisible(authWindow.login);
          }}
        />
      )}
      {windowVisible === authWindow.reset && (
        <ResetPass resetToken={resetToken ?? ""} />
      )}
    </Modal>
  );
};

export default AuthenticationModal;
