// eslint-disable-next-line import/no-cycle
import { GameData } from "../../data/game.mjs";
import { User } from "../../data/User.mjs";
import { Winner } from "../../data/winner.mjs";
import { SeaWarGameData } from "../data/game-data.mjs";
import { games } from "../data/games.mjs";
import { SEAWAR } from "../variables.mjs";
// eslint-disable-next-line import/no-cycle
import { sendForUser } from "../ws/send-for-user.mjs";

export const makeAnswer = (message) =>
  JSON.stringify({ type: "message", message });

const hideEnemyMatrix = (gameMatrix) =>
  gameMatrix.map((mtx) => mtx.map((cell) => (cell > 0 ? 0 : cell)));

export function getGameData(gameId, player) {
  const { isStarted, isLead, winner, players, moves } = games[gameId];
  const index = players.findIndex((plr) => plr === player);
  const yourField = players[index].gameMatrix;
  const enemyIndex = index === 0 ? 1 : 0;
  let enemyField = players[enemyIndex]
    ? hideEnemyMatrix(players[enemyIndex].gameMatrix)
    : new Array(10).fill(new Array(10).fill(SEAWAR.CLEAN));
  const enemyName = players[enemyIndex] ? players[enemyIndex].userName : null;
  const isEnemyReady = players[enemyIndex]
    ? players[enemyIndex].isReady
    : false;
  const isMainUser = index === 0;

  if (winner && players[enemyIndex]) {
    enemyField = players[enemyIndex].gameMatrix;
  }

  return new SeaWarGameData(
    gameId,
    player,
    enemyName,
    isEnemyReady,
    isMainUser,
    isStarted,
    isLead,
    winner,
    yourField,
    enemyField,
    moves
  );
}

export async function sendDataForPlayers(gameId) {
  games[gameId].players.forEach((plr) => {
    const data = getGameData(gameId, plr);
    sendForUser(
      plr.userName,
      gameId,
      JSON.stringify({ type: "game-data", data })
    );
  });
}

export const checkPlayerForJoining = (userName, game) =>
  game.players.some((plr) => plr.userName === userName);

const isOneShip = (matrix, x, y) =>
  ((matrix[x - 1] && matrix[x - 1][y] === SEAWAR.CLEAN) || !matrix[x - 1]) &&
  ((matrix[x + 1] && matrix[x + 1][y] === SEAWAR.CLEAN) || !matrix[x + 1]) &&
  ((matrix[x] && matrix[x][y - 1] !== SEAWAR.SHIP) || !matrix[x][y - 1]) &&
  ((matrix[x] && matrix[x][y + 1] !== SEAWAR.SHIP) || !matrix[x][y + 1]);

export function fillShips(matrix) {
  const ships = [];

  for (let i = 0; i < 10; i += 1) {
    let currentShipHor = { size: 0, cors: [] };
    let currentShipVert = { size: 0, cors: [] };

    for (let j = 0; j < 10; j += 1) {
      // Hor
      if (matrix[i][j] === SEAWAR.SHIP) {
        currentShipHor.size += 1;
        currentShipHor.cors.push([i, j]);
      } else {
        if (
          currentShipHor.size === 1 &&
          isOneShip(
            matrix,
            currentShipHor.cors[0][0],
            currentShipHor.cors[0][1]
          )
        ) {
          ships.push(currentShipHor);
        }

        if (currentShipHor.size > 1) {
          ships.push(currentShipHor);
        }

        currentShipHor = { size: 0, cors: [] };
      }

      // Vert
      if (matrix[j][i] === SEAWAR.SHIP) {
        currentShipVert.size += 1;
        currentShipVert.cors.push([j, i]);
      } else {
        if (currentShipVert.size > 1) {
          ships.push(currentShipVert);
        }

        currentShipVert = { size: 0, cors: [] };
      }
    }

    if (
      currentShipHor.size === 1 &&
      isOneShip(matrix, currentShipHor.cors[0][0], currentShipHor.cors[0][1])
    ) {
      ships.push(currentShipHor);
    }

    if (currentShipHor.size > 1) {
      ships.push(currentShipHor);
    }

    if (currentShipVert.size > 1) {
      ships.push(currentShipVert);
    }
  }

  return ships;
}

function setMissPointsArround(matrix, x, y) {
  for (let i = x - 1; i <= x + 1; i += 1) {
    for (let j = y - 1; j <= y + 1; j += 1) {
      if (matrix[i] && matrix[i][j] && matrix[i][j] > 0) {
        matrix[i][j] = -matrix[i][j];
      }
    }
  }
}

export function checkForKill(player) {
  const { gameMatrix, ships } = player;
  ships.forEach((ship) => {
    const isKilled = ship.cors.every((cor) => gameMatrix[cor[0]][cor[1]] < 0);

    if (isKilled) {
      ship.cors.forEach((point) => {
        setMissPointsArround(gameMatrix, point[0], point[1]);
      });
    }
  });
}

export const createWinner = async (player) => {
  new Winner({
    points: player.points,
    game: await GameData.findOne({ name: SEAWAR.NAME }),
    user: await User.findOne({ userName: player.userName }),
  }).save();
};

export const isGameEnded = (matrix) =>
  matrix.flat().filter((cell) => cell === SEAWAR.SHIP).length === 0;
