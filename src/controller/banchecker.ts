import type { NavigateFunction } from "react-router-dom";

import { nullUser } from "../store";

import { checkUserToken } from "./Auth";

type UserSetter = (user: {
  userName: string | null;
  image?: string | undefined;
  status: string[];
  banned: boolean;
  email: string | null;
}) => void;

type StatusSetter = (user: { isLoading: boolean; message: string }) => void;

export const checkForBan = async (
  isEn: boolean,
  setUser: UserSetter,
  setStatus: StatusSetter,
  navigate: NavigateFunction
) =>
  checkUserToken()
    .then((userData) => {
      setUser({
        userName: userData.userName,
        image: userData.image,
        status: userData.status,
        banned: userData.banned,
        email: userData.email,
      });

      return userData;
    })
    .then((userData) => {
      if (userData.banned) {
        setStatus({
          isLoading: false,
          message: isEn ? "Вы забанены!" : "You are banned!",
        });
        navigate("/");

        return true;
      }

      return false;
    })
    .catch(() => {
      setUser(nullUser);
    });
