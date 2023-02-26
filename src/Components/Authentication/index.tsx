/* eslint-disable prettier/prettier */
import type { FC } from "react";
import { useEffect, useState } from "react";

import useUserStore from "../../store";
import languageStore from "../../store/language";
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
  setPass,
}

const AuthenticationModal: FC<AuthenticationModalProps> = ({
  setModalClosed,
}) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const resetToken = urlSearchParams.get("resetToken");
  const setPass = urlSearchParams.get("setPass");

  const [windowVisible, setWindowVisible] = useState<authWindow>(
    resetToken
      ? authWindow.reset
      : setPass
      ? authWindow.setPass
      : authWindow.login
  );

  const { message } = useStatusStore();

  const { userName } = useUserStore();

  const { isEn } = languageStore();

  useEffect(() => {
    if (message) {
      setModalClosed();

      if (
        windowVisible === authWindow.reset ||
        windowVisible === authWindow.setPass
      ) {
        window.location.search = "";
      }
    }
  }, [message]);

  useEffect(() => {
    if (userName === "") {
      setModalClosed();

      if (windowVisible === authWindow.setPass) {
        window.location.search = "";
      }
    }
  }, [userName]);

  return (
    <Modal
      setModalClosed={setModalClosed}
      title={isEn ? "Аутентификация" : "Authentication"}
    >
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
