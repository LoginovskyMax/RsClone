/* eslint-disable */
import { Router } from "express";
import expressWs from "express-ws";

import { SEAWAR } from "./games/variables.mjs";
import { seaWarSocket } from "./games/ws/ws-main.mjs";

export const gameRouter = new Router();
const wsServer = expressWs(gameRouter);
const aWssSeaWar = wsServer.getWss();
const wsSeaWarPort = 8001;

gameRouter.ws(`/game/${SEAWAR.NAME}`, seaWarSocket);

gameRouter.listen(wsSeaWarPort, () => {
  console.log(`${SEAWAR.NAME} web socket is runing at port ${wsSeaWarPort}`);
});

export function sendForUser(player, gameId, message) {
  if (typeof message !== "string") {
    message = JSON.stringify(message);
  }

  aWssSeaWar.clients.forEach((client) => {
    if (client.id.split(":")[0] === player
      && client.id.split(":")[1] === gameId) {
      client.send(message);
    }
  });
}
