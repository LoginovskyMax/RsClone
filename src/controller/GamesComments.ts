import { BACKEND_URL } from "../data/authData";
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
