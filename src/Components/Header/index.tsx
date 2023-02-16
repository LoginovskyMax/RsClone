import { useEffect, useRef, useState, type FC } from "react";

import { checkUserToken } from "../../controller/Auth";
import useUserStore from "../../store";
import AuthenticationModal from "../Authentication";
import Button from "../common/Button";
import themeStore from "../../store/theme";

import Logo from "./Logo";
import User from "./User";

import "./style.scss";

const Header: FC = () => {
  const [isModalClosed, setModalClosed] = useState(true);
  const [rotate, setRotate] = useState(false)
  const userName = useUserStore((state) => state.userName);
  const setUser = useUserStore((state) => state.setUser);

  const theme = themeStore((state) => state.isDark)
  const changeTheme = themeStore((state) => state.setTheme)

  const resetToken = new URLSearchParams(window.location.search).get(
    "resetToken"
  );

  const handler = () => {
    changeTheme(!theme)
    console.log(theme);
    setRotate(true)
    setTimeout(()=>setRotate(false),700)
  }

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
        console.log(error);
      });
  }, []);

  return (
    <header className={theme ? 'header dark' : 'header'}>
      <Logo />
      <div className="header__content">
        <img
          src="images/day-and-night.png"
          alt="theme"
          className={rotate ? 'header__rotate' : 'header__theme' }
          onClick={handler}
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
