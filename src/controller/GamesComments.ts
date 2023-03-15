import { BACKEND_URL } from "../data/authData";
import type { GameComment, GameData } from "../data/gamesData";
import { BACKEND_GAMES_PATH } from "../data/gamesData";
import type { GameItem } from "../Pages/Games/games.data";

import { getUserToken } from "./Auth";

export const getAllGamesFromBackEnd = async () =>
  new Promise<Array<GameItem>>((resolve, reject) => {
    fetch(`${BACKEND_URL}${BACKEND_GAMES_PATH}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserToken()}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => resolve(data));
        } else {
          response
            .json()
            .then((err) => reject(err))
            .catch((err) => reject(err));
        }
      })
      .catch((err) => reject(err));
  });

export const getGameData = (gameName: string) =>
  new Promise<GameData>((resolve, reject) => {
    fetch(
      `https://rsgames.online:8888/games/data?name=${gameName
        ?.split("")
        .filter((char) => char !== " ")
        .join("")}`
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

export const postComment = (gameName: string, text: string, raiting: number) =>
  new Promise<GameComment>((resolve, reject) => {
    fetch(`https://rsgames.online:8888/games/comments?gameName=${gameName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${getUserToken()}`,
      },
      body: JSON.stringify({ text, raiting }),
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
