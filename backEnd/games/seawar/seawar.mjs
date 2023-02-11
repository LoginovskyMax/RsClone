import { v4 as uuidv4 } from "uuid";

import { Game, games } from "../data/games.mjs";
import { SeaWarPlayer } from "../data/seawar-player.mjs";
import { GAME, SEAWAR } from "../variables.mjs";

import { checkMatrix } from "./checker.mjs";
// eslint-disable-next-line import/no-cycle
import {
  checkForKill,
  checkPlayerForJoining,
  fillShips,
  isGameEnded,
  makeAnswer,
  sendDataForPlayers,
} from "./seawar.utils.mjs";

export function leaveSeaWarGame(data, ws) {
  const { gameId } = data;
  const userName = ws.id.split(":")[0];
  ws.id = `${userName}:`;

  const game = games[gameId];
  if (!game) return ws.send(makeAnswer(GAME.ERR_WRONG_GAME_ID));

  const index = game.players.findIndex((plr) => plr.userName === userName);

  if (index === -1) {
    return ws.send(makeAnswer(GAME.ERR_USER_NOT_FOUND));
  }

  game.players = game.players.filter((_, i) => i !== index);

  if (game.isStarted) {
    game.winner = {
      player: game.players[0],
      moves: game.players[0].moves,
    };
  }

  if (game.players.length === 0) {
    delete games[gameId];
  } else {
    return sendDataForPlayers(gameId);
  }

  return null;
}

export function createSeaWarGame(_data, ws) {
  // Dissconnect player from other games
  if (ws.id.split(":")[1] !== "") {
    leaveSeaWarGame({ gameId: ws.id.split(":")[1] }, ws);
  }

  const player = ws.id.split(":")[0];
  const gameId = uuidv4();
  ws.id = `${player}:${gameId}`;
  games[gameId] = new Game(SEAWAR.NAME);
  const newPlayer = new SeaWarPlayer(player);
  newPlayer.isOnline = true;
  games[gameId].players.push(newPlayer);

  sendDataForPlayers(gameId);
}

export function joinSeaWarGame(data, ws) {
  const { gameId } = data;

  const game = games[gameId];
  if (!game) return ws.send(makeAnswer(GAME.ERR_WRONG_GAME_ID));

  // Dissconnect player from other games
  if (ws.id.split(":")[1] !== "" && ws.id.split(":")[1] !== gameId) {
    leaveSeaWarGame({ gameId: ws.id.split(":")[1] }, ws);
  }

  const userName = ws.id.split(":")[0];
  ws.id = `${userName}:${gameId}`;

  const isJoined = checkPlayerForJoining(userName, game);

  if (game.players.length >= game.playersCount && !isJoined) {
    return ws.send(makeAnswer(GAME.ERR_GAME_IS_FULL));
  }

  if (!isJoined) {
    const newPlayer = new SeaWarPlayer(userName);
    newPlayer.isOnline = true;
    game.players.push(newPlayer);
  } else {
    game.players.find((plr) => plr.userName === userName).isOnline = true;
  }

  return sendDataForPlayers(gameId);
}

export function startSeaWarGame(data, ws) {
  const { gameId } = data;
  const userName = ws.id.split(":")[0];

  const game = games[gameId];
  if (!game) return ws.send(makeAnswer(GAME.ERR_WRONG_GAME_ID));

  if (userName !== game.players[0].userName) {
    return ws.send(makeAnswer(GAME.ERR_WRONG_MAIN_PLAYER));
  }

  if (game.players.length < games.playersCount) {
    return ws.send(makeAnswer(GAME.ERR_NOT_ENOUGH));
  }

  const mainPlayer = game.players[0];
  const isMtxCorrect = checkMatrix(mainPlayer.gameMatrix);
  mainPlayer.ships = fillShips(mainPlayer.gameMatrix);

  if (isMtxCorrect !== SEAWAR.MTX_CORRECT) {
    return ws.send(makeAnswer(isMtxCorrect));
  }

  game.players[0].isReady = true;
  const isAllUsersReady = game.players.every((player) => player.isReady);
  if (!isAllUsersReady) return ws.send(makeAnswer(GAME.ERR_NOT_ALL_READY));

  if (game.winner) {
    return ws.send(makeAnswer(GAME.GAME_ENDED));
  }

  game.isStarted = true;
  game.players[0].isLead = true;

  return sendDataForPlayers(gameId);
}

export function setSeaWarReady(data, ws) {
  const { gameId } = data;
  const userName = ws.id.split(":")[0];

  const game = games[gameId];
  if (!game) return ws.send(makeAnswer(GAME.ERR_WRONG_GAME_ID));

  const player = game.players.find((plr) => plr.userName === userName);
  if (!player) return ws.send(makeAnswer(GAME.ERR_USER_NOT_FOUND));

  const isMtxCorrect = checkMatrix(player.gameMatrix);
  player.ships = fillShips(player.gameMatrix);

  if (isMtxCorrect !== SEAWAR.MTX_CORRECT) {
    return ws.send(makeAnswer(isMtxCorrect));
  }

  player.isReady = true;

  return sendDataForPlayers(gameId);
}

export function setSeaWarNotReady(data, ws) {
  const { gameId } = data;
  const userName = ws.id.split(":")[0];

  const game = games[gameId];
  if (!game) return ws.send(makeAnswer(GAME.ERR_WRONG_GAME_ID));

  const player = game.players.find((plr) => plr.userName === userName);
  if (!player) return ws.send(makeAnswer(GAME.ERR_USER_NOT_FOUND));

  player.isReady = false;

  return sendDataForPlayers(gameId);
}

export function setShipsPositions(data, ws) {
  const { gameId, x, y } = data;
  const userName = ws.id.split(":")[0];

  const game = games[gameId];
  if (!game) return ws.send(makeAnswer(GAME.ERR_WRONG_GAME_ID));

  const player = game.players.find((plr) => plr.userName === userName);
  if (!player) return ws.send(makeAnswer(GAME.ERR_USER_NOT_FOUND));

  if (game.isStarted) {
    return ws.send(makeAnswer(GAME.ERR_GAME_IS_STARTED));
  }

  if (player.gameMatrix[x][y] === SEAWAR.CLEAN) {
    player.gameMatrix[x][y] = SEAWAR.SHIP;
  } else {
    player.gameMatrix[x][y] = SEAWAR.CLEAN;
  }

  return sendDataForPlayers(gameId);
}

export function getSeaWarGameData(data, ws) {
  const { gameId } = data;
  const userName = ws.id.split(":")[0];

  const game = games[gameId];
  if (!game) return ws.send(makeAnswer(GAME.ERR_WRONG_GAME_ID));

  const player = game.players.find((plr) => plr.userName === userName);
  if (!player) return ws.send(makeAnswer(GAME.ERR_USER_NOT_FOUND));

  return sendDataForPlayers(gameId);
}

export function nextSeaWarStep(data, ws) {
  const { gameId, x, y } = data;
  const userName = ws.id.split(":")[0];

  const game = games[gameId];
  if (!game) return ws.send(makeAnswer(GAME.ERR_WRONG_GAME_ID));

  const player = game.players.find((plr) => plr.userName === userName);
  if (!player) return ws.send(makeAnswer(GAME.ERR_USER_NOT_FOUND));

  if (player.isLead) {
    const index = game.players.findIndex((plr) => plr === player);
    const enemyIndex = index === 0 ? 1 : 0;
    const enemy = game.players[enemyIndex];
    const enemyCell = enemy.gameMatrix[x][y];

    if (enemy.gameMatrix[x][y] > 0) {
      enemy.gameMatrix[x][y] = -enemy.gameMatrix[x][y];
    }

    if (enemyCell === SEAWAR.CLEAN) {
      player.isLead = false;
      enemy.isLead = true;
    } else {
      checkForKill(enemy);

      if (isGameEnded(enemy.gameMatrix)) {
        // TODO: save to DB
        game.winner = {
          player,
          moves: player.moves,
        };
        game.isStarted = false;
        game.isLead = false;
      }
    }

    player.moves += 1;
  }

  return sendDataForPlayers(gameId);
}
