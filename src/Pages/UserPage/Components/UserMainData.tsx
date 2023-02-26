import type { FC } from "react";

import Button from "../../../Components/common/Button";
import { banUser, unbanUser } from "../../../controller/UserControls";
import type { UserData } from "../../../data/authData";
import useUserStore from "../../../store";
import languageStore from "../../../store/language";
import { DEFAULT_PICTURE, userStatus } from "../UserPageData";

import { AdminComp } from "./context/AdminComp";
import { ModerComp } from "./context/ModerComp";
import { StatusLableComponent } from "./StatusLableComponent";

import "../UserPage.scss";

interface UserMainCompProps {
  user?: UserData;
  refresh: () => void;
}

export const UserMainComp: FC<UserMainCompProps> = ({ user, refresh }) => {
  const { isEn } = languageStore();
  const { status } = useUserStore();

  return (
    <div className="user-profile">
      {user !== undefined ? (
        <>
          <div
            className="user-profile__picture"
            style={{ backgroundImage: `url(${user.image || DEFAULT_PICTURE})` }}
          />
          <div className="user-profile__wrapper">
            <AdminComp isAdmin={status.includes(userStatus.admin)}>
              <div className="user-profile__status">
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
            </AdminComp>
            <div className="user-profile__name">{user.userName}</div>
            <div className="user-profile__ban-status">
              {user.banned ? (
                <div className="user-profile__is-baned">
                  {isEn ? "забанен" : "banned"}
                </div>
              ) : (
                <div className="user-profile__is-active">
                  {isEn ? "активен" : "active"}
                </div>
              )}
              <ModerComp
                isModer={
                  status.includes(userStatus.moderator) ||
                  status.includes(userStatus.admin)
                }
              >
                {!user.banned ? (
                  <Button
                    className="user-profile__ban-btn"
                    onClick={() => banUser(user.userName).then(() => refresh())}
                  >
                    {isEn ? "бан" : "ban"}
                  </Button>
                ) : (
                  <Button
                    className="user-profile__unban-btn"
                    onClick={() =>
                      unbanUser(user.userName).then(() => refresh())
                    }
                  >
                    {isEn ? "разбанить" : "unban"}
                  </Button>
                )}
              </ModerComp>
            </div>
          </div>
        </>
      ) : (
        <div className="user-profile__not-found">User Not Found</div>
      )}
    </div>
  );
};
