import { type FC } from "react";

import Button from "../common/Button";

import Logo from "./Logo";

import "./style.scss";

const Header: FC = () => (
  <header className="header">
    <Logo />
    <div className="header__content">
      <img
        src="images/day-and-night.png"
        alt="theme"
        className="header__theme"
      />
      <Button>Sign in</Button>
    </div>
  </header>
);

export default Header;
