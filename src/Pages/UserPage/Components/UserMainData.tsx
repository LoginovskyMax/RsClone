import type { FC } from "react";

import Button from "../../../Components/common/Button";
import { banUser, unbanUser } from "../../../controller/UserControls";
import type { UserData } from "../../../data/authData";
import { DEFAULT_PICTURE, userStatus } from "../UserPageData";

import { StatusLableComponent } from "./StatusLableComponent";

import "./style.scss";

interface UserMainCompProps {
  user?: UserData;
  refresh: () => void;
}

export const UserMainComp: FC<UserMainCompProps> = ({ user, refresh }) => (
  <div className="user">
    {user !== undefined ? (
      <>
        <div
          className="user__picture"
          style={{ backgroundImage: `url(${user.image || DEFAULT_PICTURE})` }}
        />
        <div className="user__wrapper">
          <div className="user__status">
            <StatusLableComponent
              user={user}
              uStatus={userStatus.admin}
              refresh={refresh}
            />
            <StatusLableComponent
              user={user}
              uStatus={userStatus.moderator}
              refresh={refresh}
            />
            <StatusLableComponent
              user={user}
              uStatus={userStatus.user}
              refresh={refresh}
            />
          </div>
          <div className="user__name">{user.userName}</div>
          <div className="user__ban-status">
            {user.banned ? (
              <div className="user__is-baned">banned</div>
            ) : (
              <div className="user__is-active">active</div>
            )}
            {!user.banned ? (
              <Button
                className="user__ban-btn"
                onClick={() => banUser(user.userName).then(() => refresh())}
              >
                Ban
              </Button>
            ) : (
              <Button
                className="user__unban-btn"
                onClick={() => unbanUser(user.userName).then(() => refresh())}
              >
                Unban
              </Button>
            )}
          </div>
        </div>
      </>
    ) : (
      <div className="user__not-found">User Not Found</div>
    )}
  </div>
);
