import { type FC } from "react";
import "./style.scss";

interface UserProps {
  username: string;
}

const User: FC<UserProps> = ({ username }) => (
  <div className="user">
    <img className="user__image" alt="user" src="images/user.png" />
    <p className="user__text">{username}</p>
  </div>
);

export default User;
