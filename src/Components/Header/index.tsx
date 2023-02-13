import { useEffect, useState, type FC } from "react";

import { checkUserToken } from "../../controller/Auth";
import useUserStore from "../../store";
import AuthenticationModal from "../Authentication";
import Button from "../common/Button";

import Logo from "./Logo";
import User from "./User";

import "./style.scss";

const Header: FC = () => {
  const [isModalClosed, setModalClosed] = useState(true);
  const userName = useUserStore((state) => state.userName);

  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    checkUserToken()
      .then((userData) => {
        setUser({
          userName: userData.userName,
          status: userData.status,
        });
      })
      .catch((error) => {
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
          <User username={userName} />
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
