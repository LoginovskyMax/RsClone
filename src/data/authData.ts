export const BACKEND_URL =
  import.meta.env.VITE_BACK_SOURCE || "https://rsgames.online:8888";

export const BACKEND_LOGIN_PATH = "/auth/login/";

export const BACKEND_MYUSER_PATH = "/auth/myuser/";

export const BACKEND_REG_PATH = "/auth/registr/";

export const BACKEND_FORGOT_PATH = "/auth/forgotpass/";

export const BACKEND_SETPASS_PATH = "/auth/setpass/";

export const COOKIE_TOKEN_VAL = "userToken";

export const FETCH_ERROR = "Failed to fetch";

export const FETCH_CORRECT_ERROR = "Too frequent requests";

export const WIN_DATA = "/win/data";

export const USERS_LIST = "/auth/users";

export const USER_PATH = "/auth/user";

export const MY_USER_PATH = "/auth/myuser";

export interface Values {
  userName: string;
  password: string;
}

export interface UserData {
  _id: string;
  userName: string;
  image?: string;
  email: string;
  status: Array<string>;
  banned: boolean;
  date: Date;
}

export interface TokenData {
  token: string;
}

export interface NewUserData {
  userName: string;
  email: string;
  password: string;
}

export interface ForgotUserData {
  userName?: string;
  email?: string;
}

export interface MessageData {
  message: string;
}

export interface NewPassData {
  resetToken: string;
  password: string;
}

export interface ChangePassData {
  password: string;
  newPassword: string;
}
