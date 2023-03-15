import type {
  TokenData,
  UserData,
  Values,
  NewUserData,
  ForgotUserData,
  MessageData,
  NewPassData,
  ChangePassData,
} from "../data/authData";
import {
  FETCH_CORRECT_ERROR,
  BACKEND_URL,
  BACKEND_MYUSER_PATH,
  BACKEND_LOGIN_PATH,
  BACKEND_REG_PATH,
  BACKEND_FORGOT_PATH,
  COOKIE_TOKEN_VAL,
  BACKEND_SETPASS_PATH,
  FETCH_ERROR,
} from "../data/authData";

export const getUserToken = (): string => {
  const token = document.cookie
    .split(";")
    .find((val) => val.split("=")[0].trim() === COOKIE_TOKEN_VAL);

  return token?.split("=")[1] ?? "";
};

export const logoutUser = () => {
  document.cookie = `userToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
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
        response.json().then((data) => {
          data.fetched = true;
          resolve(data);
        });
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
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response
            .json()
            .then((errorMessage) => reject(errorMessage))
            .catch((err) => reject(err.message));
        }
      })
      .catch((err) => {
        if (err.message === FETCH_ERROR) {
          err.message = FETCH_CORRECT_ERROR;
        }

        reject(err);
      });
  });

export const getUserNameByResetToken = async (resetToken: string) =>
  new Promise<ForgotUserData>((resolve, reject) => {
    fetch(
      `${BACKEND_URL}${BACKEND_SETPASS_PATH}?resetToken=${resetToken}`
    ).then((response) => {
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

export const changePassword = async (data: ChangePassData) =>
  new Promise<MessageData>((resolve, reject) => {
    fetch(`${BACKEND_URL}${BACKEND_SETPASS_PATH}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserToken()}`,
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
