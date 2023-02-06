import { useState, type FC } from "react";

import useUserStore from "../../store";
import AuthenticationModal from "../Authentication";
import Button from "../common/Button";

import Logo from "./Logo";
import User from "./User";

import "./style.scss";

const Header: FC = () => {
  const [isModalClosed, setModalClosed] = useState(true);
  const user = useUserStore((state) => state.user);

  return (
    <header className="header">
      <Logo />
      <div className="header__content">
        <img
          src="images/day-and-night.png"
          alt="theme"
          className="header__theme"
        />
        {user ? (
          <User username={user} />
        ) : (
          <Button onClick={() => setModalClosed(false)}>Sign in</Button>
        )}
      </div>
      {!isModalClosed && (
        <AuthenticationModal setModalClosed={() => setModalClosed(true)} />
      )}
    </header>
  );
};

export default Header;
