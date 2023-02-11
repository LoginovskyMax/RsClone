import { checkUser } from "../../controllers/user-controller.mjs";
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
import { GAME } from "../variables.mjs";

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

  ws.id = `${player}:`;

  return ws.send(makeAnswer(GAME.WS_CONNECTED));
}

export async function seaWarSocket(ws, _req) {
  ws.on("message", async (msg) => {
    try {
      const { type, data } = JSON.parse(msg);

      if (type === "ws-connect") {
        await wsConnect(ws, data);
      } else if (!messageHandler[type]) {
        await ws.send(makeAnswer("Wrong message type!"));
      } else {
        messageHandler[type](data, ws);
      }
    } catch (err) {
      ws.send(makeAnswer(`${GAME.ERR_SERVER} ${err.message}`));
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  });
}
