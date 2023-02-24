export interface IUsersList {
  _id: string;
  userName: string;
  password: string;
  status: string[];
  date: string;
  __v: number;
  banned: boolean;
  email: string;
}

export interface IWinData {
  date: string;
  gameName: string;
  points: number;
  position: number;
  userName: string;
  _id: string;
}
