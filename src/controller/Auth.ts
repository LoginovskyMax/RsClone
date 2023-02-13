/* eslint-disable*/
import type { TokenData, UserData, Values } from "../data/authData";
import {
  BACKEND_URL,
  BACKEND_MYUSER_PATH,
  BACKEND_LOGIN_PATH,
  COOKIE_TOKEN_VAL,
} from "../data/authData";

export const getUserToken = (): string => {
  const token = document.cookie
      .split(";")
      .find((val) => val.split("=")[0].trim() === COOKIE_TOKEN_VAL);

  return token?.split("=")[1] ?? '';
}

const getUserDataByToken = async () =>
  fetch(`${BACKEND_URL}${BACKEND_MYUSER_PATH}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserToken()}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return response.json().then((errorMessage) => {
        throw new Error(errorMessage);
      });
    })

export const checkUserToken = async () =>
  new Promise<UserData>((resolve, reject) => {
    console.log("before getUserDataByToken");
    getUserDataByToken()
      .then((userData) => {
        console.log("getUserDataByToken", userData);
        resolve(userData);
      })
      .catch((err) => {
        // document.cookie = `${COOKIE_TOKEN_VAL}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        reject(err);
      });
  });

export const authLogin = async (data: Values) =>
  fetch(`${BACKEND_URL}${BACKEND_LOGIN_PATH}`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      response.json().then((errorMessage) => {
        console.error(errorMessage);
        throw new Error(errorMessage);
      });
    })
    // eslint-disable-next-line @typescript-eslint/no-shadow
    .then((data: TokenData) => (document.cookie = `userToken=${data.token}`));
