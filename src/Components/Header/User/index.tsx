import { type FC } from "react";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../../controller/Auth";
import type { userSetter } from "../../../store";
import { nullUser } from "../../../store";
import languageStore from "../../../store/language";
import "./style.scss";

interface UserProps {
  username: string;
  image?: string;
  setUser: userSetter;
}

const User: FC<UserProps> = ({ username, setUser, image }) => {
  const { isEn } = languageStore();
  const navigate = useNavigate();

  return (
    <div className="user">
      <div
        onClick={() => navigate(`/user/${username}`)}
        className="user__click"
      >
        <div
          className="user__image"
          style={{
            backgroundImage: `url(${image || "images/user.png"})`,
          }}
        />
        <p className="user__text">{username}</p>
      </div>

      <button
        className="button"
        onClick={() => {
          logoutUser();
          setUser(nullUser);
        }}
      >
        {isEn ? "Выйти" : "Logout"}
      </button>
    </div>
  );
};

export default User;
