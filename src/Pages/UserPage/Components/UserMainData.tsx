import type { FC } from "react";

import type { UserData } from "../../../data/authData";

import "./style.scss";

import { DEFAULT_PICTURE, userStatus } from "../UserPageData";
import Button from "../../../Components/common/Button";

interface UserMainCompProps {
  user: UserData;
}

export const UserMainComp: FC<UserMainCompProps> = ({ user }) => (
  <div className="user">
    <div
      className="user__picture"
      style={{ backgroundImage: `url(${user.image || DEFAULT_PICTURE})` }}
    />
    <div className="user__wrapper">
      <div className="user__status">
        {user.status.includes(userStatus.admin) && (
          <div className="user__status_admin">admin</div>
        )}
        {user.status.includes(userStatus.moderator) && (
          <div className="user__status_moderator">moderator</div>
        )}
        {user.status.includes(userStatus.user) && (
          <div className="user__status_user">user</div>
        )}
      </div>
      <div className="user__name">${user.userName}</div>
      <div className="user__ban-status">
        {user.banned ? (
          <div className="user__is-baned">ban</div>
        ) : (
          <div className="user__is-active">active</div>
        )}
        {user.status.includes(userStatus.moderator) ||
        (user.status.includes(userStatus.admin) && !user.banned) ? (
          <Button className="user__ban-btn">Ban!</Button>
        ) : (
          <Button className="user__unban-btn">Unban</Button>
        )}
      </div>
    </div>
  </div>
);
