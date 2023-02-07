import { v4 as uuidv4 } from "uuid";

import { Game, games } from "../games.mjs";
import { GAME, SEAWAR } from "../variables.mjs";

import { SeaWarPlayer } from "./seawar-player.mjs";

export function newSeaWarGame(userName) {
  const gameId = uuidv4();
  games[gameId] = new Game(SEAWAR.NAME);
  games[gameId].players.push(new SeaWarPlayer(userName));

  return gameId;
}

export function conectToSeaWarGame(gameId, userName) {
  const game = games[gameId];

  if (game.players.length < game.playersCount) {
    game.players.push(new SeaWarPlayer(userName));

    return gameId;
  }

  return null;
}

export function disconnectFromSeaWarGame(gameId, userName) {
  const game = games[gameId];
  const index = game.players.findIndex((plr) => plr.userName === userName);

  if (index === 0) {
    return GAME.ERR_MAIN_USER;
  }

  if (index === -1) {
    return GAME.ERR_USER_NOT_FOUND;
  }

  game.players = game.players.filter((_, i) => i !== index);

  return GAME.USER_DISCONNECT;
}

/*
games = {
  "<UUID>": {
    gameName: "SeaVars"
    players: [
      {
        userName: "Jerubrin"
        isReady: true,
        gameMatrix: [
          [1, 1, 1, 2, 1, 1, 2, 1, 1, 1],
          [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
          [2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [2, 1, 1, 1, 1, 1, 1, 2, 1, 1],
          [2, 1, 2, 1, 1, 1, 1, 2, 1, 1],
          [1, 1, 2, 1, 1, 1, 1, 1, 1, 2],
          [1, 1, 2, 1, 1, 1, 1, 1, 1, 2],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [2, 1, 1, 1, 1, 1, 2, 2, 1, 1],
          [1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
        ]
        // 0 = CLEAN   1 = SHIP   -1 = MISS   2 = HIT
        moves: 0,
      },
      {
        userName: "Max"
        isReady: false,
        gameMatrix: [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ]
        // 0 = CLEAN   1 = SHIP   -1 = MISS   2 = HIT
        moves: 0,
      },
    ],
    playersCount: 2,
    isStarted: false,
    winner: { player: null, moves: 0, time: 0 }
  } as Game
}
*/
