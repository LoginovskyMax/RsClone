import type { FC } from "react";

import type { UserData } from "../../../data/authData";
import languageStore from "../../../store/language";
import type { userStatus } from "../UserPageData";
import { userStatusRu } from "../UserPageData";

import "../UserPage.scss";
import { changeUserStatus } from "./UserMainData.utils";

interface StatusLableComponentProps {
  user: UserData;
  uStatus: userStatus;
  refresh: () => void;
}

export const StatusLableComponent: FC<StatusLableComponentProps> = ({
  user,
  uStatus,
  refresh,
}) => {
  const { isEn } = languageStore();

  return (
    <div
      className={`user-profile__status_${
        user.status.includes(uStatus) ? uStatus : "disabled"
      }`}
      onClick={() => changeUserStatus(user, uStatus).then(refresh)}
    >
      {isEn ? userStatusRu[uStatus] : uStatus}
    </div>
  );
};
