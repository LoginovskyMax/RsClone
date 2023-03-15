/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState, type FC } from "react";

import { checkUserToken } from "../../controller/Auth";
import useUserStore, { nullUser } from "../../store";
// eslint-disable-next-line import/named
import languageStore from "../../store/language";
import themeStore, { LS_THEME } from "../../store/theme";
import AuthenticationModal from "../Authentication";
import Button from "../common/Button";

import { LangComp } from "./Lang/LangComp";
import Logo from "./Logo";
import User from "./User";

import "./style.scss";

const Header: FC = () => {
  const [isModalClosed, setModalClosed] = useState(true);
  const [rotate, setRotate] = useState(false);
  const { userName, image, setUser } = useUserStore();
  const { isEn } = languageStore();
  const theme = themeStore((state) => state.isDark);
  const changeTheme = themeStore((state) => state.setTheme);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const resetToken = urlSearchParams.get("resetToken");
  const setPass = urlSearchParams.get("setPass");

  const handler = () => {
    localStorage.setItem(LS_THEME, (!theme).toString());
    changeTheme(!theme);
    setRotate(true);
    setTimeout(() => setRotate(false), 700);
  };

  useEffect(() => {
    if (resetToken || setPass) {
      setModalClosed(false);
    }
  }, []);

  useEffect(() => {
    checkUserToken()
      .then((userData) => {
        setUser({
          userName: userData.userName,
          image: userData.image,
          status: userData.status,
          banned: userData.banned,
          email: userData.email,
        });
      })
      .catch(() => {
        setUser(nullUser);
      });
  }, []);

  return (
    <header className={theme ? "header dark" : "header"}>
      <Logo />
      <div className="header__content">
        <LangComp />
        <img
          src="images/day-and-night.png"
          alt="theme"
          className={rotate ? "header__rotate" : "header__theme"}
          onClick={handler}
        />
        {userName ? (
          <User username={userName} setUser={setUser} image={image} />
        ) : (
          <Button onClick={() => setModalClosed(false)}>
            {isEn ? "Войти" : "Sign in"}
          </Button>
        )}
      </div>
      {!isModalClosed && (
        <AuthenticationModal
          setModalClosed={() => {
            setModalClosed(true);
            window.location.search = "";
          }}
        />
      )}
    </header>
  );
};

export default Header;
