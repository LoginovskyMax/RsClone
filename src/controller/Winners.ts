import { BACKEND_URL, WIN_DATA } from "../data/authData";
import type { WinnerRes } from "../data/winData";

import { getUserToken } from "./Auth";

export const postWinner = (gameName: string, points: number) =>
  new Promise<WinnerRes>((resolve, reject) => {
    fetch(`${BACKEND_URL}${WIN_DATA}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${getUserToken()}`,
      },
      body: JSON.stringify({ game: gameName, points }),
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

export const getGameWinsList = (gameName: string) =>
  new Promise<Array<WinnerRes>>((resolve, reject) => {
    fetch(`${BACKEND_URL}${WIN_DATA}?game=${gameName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${getUserToken()}`,
      },
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

export const getUserWinsList = () =>
  new Promise<Array<WinnerRes>>((resolve, reject) => {
    fetch(`${BACKEND_URL}${WIN_DATA}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${getUserToken()}`,
      },
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
