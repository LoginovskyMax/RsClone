export const BACKEND_URL = "https://rsgames.online:8888";

export const BACKEND_LOGIN_PATH = "/auth/login/";

export const BACKEND_MYUSER_PATH = "/auth/myuser/";

export const BACKEND_REG_PATH = "/auth/registr/";

export const BACKEND_FORGOT_PATH = "/auth/forgotpass/";

export const BACKEND_SETPASS_PATH = "/auth/setpass/";

export const COOKIE_TOKEN_VAL = "userToken";

export interface Values {
  userName: string;
  password: string;
}

export interface UserData {
  userName: string;
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
