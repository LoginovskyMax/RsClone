import { useEffect, useState, type FC } from "react";

import { checkUserToken } from "../../controller/Auth";
import useUserStore, { nullUser } from "../../store";
import AuthenticationModal from "../Authentication";
import Button from "../common/Button";

import Logo from "./Logo";
import User from "./User";

import "./style.scss";

const Header: FC = () => {
  const [isModalClosed, setModalClosed] = useState(true);

  const userName = useUserStore((state) => state.userName);
  const setUser = useUserStore((state) => state.setUser);

  const resetToken = new URLSearchParams(window.location.search).get(
    "resetToken"
  );

  useEffect(() => {
    if (resetToken) {
      setModalClosed(false);
    }
  }, []);

  useEffect(() => {
    checkUserToken()
      .then((userData) => {
        setUser({
          userName: userData.userName,
          status: userData.status,
          banned: userData.banned,
          email: userData.email,
        });
      })
      .catch((error) => {
        setUser(nullUser);
        console.log(error);
      });
  }, []);

  return (
    <header className="header">
      <Logo />
      <div className="header__content">
        <img
          src="images/day-and-night.png"
          alt="theme"
          className="header__theme"
        />
        {userName ? (
          <User username={userName} setUser={setUser} />
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
