import { FC, useState } from "react";

import ChangePass from "../../../Components/Authentication/ChangePass";
import Button from "../../../Components/common/Button";
import Modal from "../../../Components/common/Modal";
import {
  banUser,
  deleteUser,
  unbanUser,
} from "../../../controller/UserControls";
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
  const { status, userName } = useUserStore();
  const [changePass, setChangePass] = useState(false);
  const [removeUser, setRemoveUser] = useState(false);

  return (
    <div className="user-profile">
      {user?.userName ? (
        <>
          <div
            className="user-profile__picture"
            style={{ backgroundImage: `url(${user.image || DEFAULT_PICTURE})` }}
          />
          <div className="user-profile__wrapper">
            <AdminComp isAdmin={status && status.includes(userStatus.admin)}>
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
                <div
                  className="user-profile__delete"
                  onClick={() => setRemoveUser(true)}
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
                  (status && status.includes(userStatus.moderator)) ||
                  (status && status.includes(userStatus.admin))
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
              <ModerComp isModer={user.userName === userName}>
                <Button
                  onClick={() => setChangePass(true)}
                  className="user-profile__change-password"
                >
                  {isEn ? "Изменить пароль" : "Change password"}
                </Button>
              </ModerComp>
            </div>
          </div>
        </>
      ) : (
        <div className="user-profile__not-found">User Not Found</div>
      )}
      {changePass && (
        <Modal
          setModalClosed={() => setChangePass(false)}
          title={isEn ? "Изменить пароль" : "Change password"}
        >
          <ChangePass setModalClosed={() => setChangePass(false)} />
        </Modal>
      )}
      {removeUser && (
        <Modal
          setModalClosed={() => setRemoveUser(false)}
          title={isEn ? "Удалить пользователя?" : "Remove user?"}
        >
          <div className="popup-dialog">
            <p className="popup-dialog__text">
              {isEn
                ? "Вы действительно хотите удалить данного пользователя? Изменения будут необратимы!"
                : "Are you realy want to delete this user? The changes will be irreversible!"}
            </p>
            <div className="popup-dialog__buttons">
              <Button onClick={() => setRemoveUser(false)}>
                {isEn ? "Нет" : "No"}
              </Button>
              <Button
                onClick={() => {
                  deleteUser(user?.userName ?? "").then(() =>
                    setRemoveUser(false)
                  );
                }}
              >
                {isEn ? "Да" : "Yes"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
