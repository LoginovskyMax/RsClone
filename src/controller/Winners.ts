import type { WinnerRes } from "../data/winData";

import { getUserToken } from "./Auth";

export const postWinner = (gameName: string, points: number) =>
  new Promise<WinnerRes>((resolve, reject) => {
    fetch(`https://rsgames.online:8888/win/data`, {
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
  new Promise<WinnerRes>((resolve, reject) => {
    fetch(`https://rsgames.online:8888/win/data?game=${gameName}`, {
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
  new Promise<WinnerRes>((resolve, reject) => {
    fetch(`https://rsgames.online:8888/win/data`, {
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
