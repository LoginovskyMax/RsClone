import type {
  TokenData,
  UserData,
  Values,
  NewUserData,
  ForgotUserData,
  MessageData,
  NewPassData,
} from "../data/authData";
import {
  BACKEND_URL,
  BACKEND_MYUSER_PATH,
  BACKEND_LOGIN_PATH,
  BACKEND_REG_PATH,
  BACKEND_FORGOT_PATH,
  COOKIE_TOKEN_VAL,
  BACKEND_SETPASS_PATH,
} from "../data/authData";

export const getUserToken = (): string => {
  const token = document.cookie
    .split(";")
    .find((val) => val.split("=")[0].trim() === COOKIE_TOKEN_VAL);

  return token?.split("=")[1] ?? "";
};

export const logoutUser = () => {
  document.cookie = `${COOKIE_TOKEN_VAL}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};

const getUserDataByToken = async (): Promise<UserData> =>
  new Promise((resolve, reject) => {
    fetch(`${BACKEND_URL}${BACKEND_MYUSER_PATH}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserToken()}`,
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => resolve(data));
      } else {
        response
          .json()
          .then((errorMessage) => reject(errorMessage))
          .catch((err) => reject(err.message));
      }
    });
  });

export const checkUserToken = async () =>
  new Promise<UserData>((resolve, reject) => {
    getUserDataByToken()
      .then((userData: UserData) => {
        resolve(userData);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const authLogin = async (data: Values) =>
  new Promise((resolve, reject) => {
    fetch(`${BACKEND_URL}${BACKEND_LOGIN_PATH}`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        response.json().then((tokenData: TokenData) => {
          document.cookie = `userToken=${tokenData.token}`;
          resolve(tokenData);
        });
      } else {
        response
          .json()
          .then((errorMessage) => reject(errorMessage))
          .catch((err) => reject(err.message));
      }
    });
  });

export const createUser = async (data: NewUserData) =>
  new Promise((resolve, reject) => {
    fetch(`${BACKEND_URL}${BACKEND_REG_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        response
          .json()
          .then((errorMessage) => reject(errorMessage))
          .catch((err) => reject(err.message));
      }
    });
  });

export const forgotPassword = async (data: ForgotUserData) =>
  new Promise<MessageData>((resolve, reject) => {
    fetch(`${BACKEND_URL}${BACKEND_FORGOT_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        response
          .json()
          .then((errorMessage) => reject(errorMessage))
          .catch((err) => reject(err.message));
      }
    });
  });

export const getUserNameByResetToken = async (resetToken: string) =>
  new Promise<ForgotUserData>((resolve, reject) => {
    fetch(`${BACKEND_URL}${BACKEND_FORGOT_PATH}?resetToken=${resetToken}`).then(
      (response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response
            .json()
            .then((errorMessage) => reject(errorMessage))
            .catch((err) => reject(err.message));
        }
      }
    );
  });

export const setNewPassword = async (data: NewPassData) =>
  new Promise<MessageData>((resolve, reject) => {
    fetch(`${BACKEND_URL}${BACKEND_SETPASS_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        response
          .json()
          .then((errorMessage) => reject(errorMessage))
          .catch((err) => reject(err.message));
      }
    });
  });
