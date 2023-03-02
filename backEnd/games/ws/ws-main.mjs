import { checkUser } from "../../controllers/user-controller.mjs";
import { User } from "../../data/User.mjs";
import { logger } from "../../logger.mjs";
import { games } from "../data/games.mjs";
// eslint-disable-next-line import/no-cycle
import {
  createSeaWarGame,
  joinSeaWarGame,
  leaveSeaWarGame,
  getSeaWarGameData,
  nextSeaWarStep,
  setSeaWarNotReady,
  setSeaWarReady,
  setShipsPositions,
  startSeaWarGame,
} from "../seawar/seawar.mjs";
import { makeAnswer } from "../seawar/seawar.utils.mjs";
import { GAME, TIMEOUT } from "../variables.mjs";

const messageHandler = {
  create: createSeaWarGame,
  join: joinSeaWarGame,
  leave: leaveSeaWarGame,
  start: startSeaWarGame,
  ready: setSeaWarReady,
  "not-ready": setSeaWarNotReady,
  set: setShipsPositions,
  "get-data": getSeaWarGameData,
  move: nextSeaWarStep,
};

async function wsConnect(ws, data) {
  const { player, token } = data;

  if (!(await checkUser(player, token))) {
    return ws.send(makeAnswer(GAME.ERR_WRONG_TOKEN));
  }

  if ((await User.findOne({ userName: player })).banned) {
    return ws.send(makeAnswer(GAME.ERR_USER_IS_BANNED));
  }

  ws.id = `${player}:`;

  return ws.send(makeAnswer(GAME.WS_CONNECTED));
}

export async function seaWarSocket(ws) {
  ws.on("message", async (msg) => {
    try {
      const { type, data } = JSON.parse(msg);

      if (type === "ws-connect") {
        await wsConnect(ws, data);
      } else if (!messageHandler[type]) {
        await ws.send(makeAnswer("Wrong message type!"));
      } else {
        if ((await User.findOne({ userName: ws.id.split(":")[0] })).banned) {
          ws.send(makeAnswer(GAME.ERR_USER_IS_BANNED));
        }

        messageHandler[type](data, ws);
      }
    } catch (err) {
      ws.send(makeAnswer(`${GAME.ERR_SERVER} ${err.message}`));
      logger.error(err.message);
    }
  });
  ws.on("close", () => {
    try {
      const [userName, gameId] = ws.id.split(":");
      const game = games[gameId];

      if (!game) return;
      const player = game.players.find((plr) => plr.userName === userName);
      player.isOnline = false;

      if (gameId === "") return;
      // eslint-disable-next-line consistent-return
      setTimeout(() => {
        try {
          const resPlayer = game.players.find(
            (plr) => plr.userName === userName
          );

          if (resPlayer.isOnline) {
            return null;
          }

          if (!game) {
            return null;
          }

          leaveSeaWarGame({ gameId }, ws);
          game.players = game.players.filter(
            (plr) => plr.userName !== userName
          );
        } catch {
          /* empty */
        }
      }, TIMEOUT);
    } catch {
      /* empty */
    }
  });
}
