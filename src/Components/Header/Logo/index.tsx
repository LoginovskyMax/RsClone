import { type FC } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const Logo: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="logo" onClick={() => navigate("/")}>
      <img className="logo__image" alt="joystick" src="images/joystick.png" />
      <p className="logo__text">Gaming Zone</p>
    </div>
  );
};

export default Logo;
