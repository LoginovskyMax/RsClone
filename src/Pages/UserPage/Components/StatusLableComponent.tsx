import type { FC } from "react";

import type { UserData } from "../../../data/authData";
import type { userStatus } from "../UserPageData";

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
}) => (
  <div
    className={`user__status_${
      user.status.includes(uStatus) ? uStatus : "disabled"
    }`}
    onClick={() => changeUserStatus(user, uStatus).then(refresh)}
  >
    {uStatus}
  </div>
);
