import type { FC } from "react";
import { useState } from "react";

import Modal from "../common/Modal";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface AuthenticationModalProps {
  setModalClosed: () => void;
}

const AuthenticationModal: FC<AuthenticationModalProps> = ({
  setModalClosed,
}) => {
  const [isSignInModalOpened, setSignInModalOpened] = useState(true);

  return (
    <Modal setModalClosed={setModalClosed} title="Authentication">
      {isSignInModalOpened ? (
        <SignIn
          setModalClosed={setModalClosed}
          setSignInModalOpened={() => {
            setSignInModalOpened(!isSignInModalOpened);
          }}
        />
      ) : (
        <SignUp
          setModalClosed={setModalClosed}
          setSignInModalOpened={() => {
            setSignInModalOpened(!isSignInModalOpened);
          }}
        />
      )}
    </Modal>
  );
};

export default AuthenticationModal;
