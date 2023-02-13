import { type FC } from "react";

import { logoutUser } from "../../../controller/Auth";
import "./style.scss";

interface UserProps {
  username: string;
  setUser: (user: { userName: string | null; status: string[] }) => void;
}

const User: FC<UserProps> = ({ username, setUser }) => (
  <div className="user">
    <img className="user__image" alt="user" src="images/user.png" />
    <p className="user__text">{username}</p>
    <button
      className="button"
      onClick={() => {
        logoutUser();
        setUser({ userName: null, status: [] });
      }}
    >
      logout
    </button>
  </div>
);

export default User;
