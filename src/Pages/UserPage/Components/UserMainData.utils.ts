import { setUserStatus } from "../../../controller/UserControls";
import type { UserData } from "../../../data/authData";

export const changeUserStatus = async (user: UserData, statusName: string) => {
  let { status } = { ...user };
  const { userName } = { ...user };

  if (status.includes(statusName)) {
    status = status.filter((stat) => stat !== statusName);
  } else {
    status.push(statusName);
  }

  return setUserStatus(userName, status);
};
