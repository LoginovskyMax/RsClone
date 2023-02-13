export const BACKEND_URL = "https://rsgames.online:8888";

export const BACKEND_LOGIN_PATH = "/auth/login/";

export const BACKEND_MYUSER_PATH = "/auth/myuser/";

export const BACKEND_REGISTR_PATH = "/auth/registr/";

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
