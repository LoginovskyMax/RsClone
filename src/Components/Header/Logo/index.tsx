import { type FC } from "react";
import "./style.scss";

const Logo: FC = () => (
  <div className="logo">
    <img className="logo__image" alt="joystick" src="images/joystick.png" />
    <p className="logo__text">Gaming Zone</p>
  </div>
);

export default Logo;
