import { type FC } from "react";

import { logoutUser } from "../../../controller/Auth";
import type { userSetter } from "../../../store";
import { nullUser } from "../../../store";
import "./style.scss";

interface UserProps {
  username: string;
  setUser: userSetter;
}

const User: FC<UserProps> = ({ username, setUser }) => (
  <div className="user">
    <img className="user__image" alt="user" src="images/user.png" />
    <p className="user__text">{username}</p>
    <button
      className="button"
      onClick={() => {
        logoutUser();
        setUser(nullUser);
      }}
    >
      logout
    </button>
  </div>
);

export default User;
