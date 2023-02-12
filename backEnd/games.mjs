import bodyParser from "body-parser";
import { Router } from "express";
import expressWs from "express-ws";
import { asyncMiddleware } from "middleware-async";

import {
  addComment,
  addNewGame,
  editComment,
  editGameData,
  getAllComments,
  getGameData,
  getGameList,
  getGamesList,
  removeComment,
} from "./controllers/game-data-controller.mjs";
import { SEAWAR } from "./games/variables.mjs";
// eslint-disable-next-line import/no-cycle
import { seaWarSocket } from "./games/ws/ws-main.mjs";
import { adminMiddleware } from "./middleware/admin-middleware.mjs";
import { authorizedUser } from "./middleware/authorized-user.mjs";
import { banedUser } from './middleware/baned-midleware.mjs';

export const gameRouter = new Router();
const wsServer = expressWs(gameRouter);
const aWssSeaWar = wsServer.getWss();
const wsSeaWarPort = 8001;

const jsonParser = bodyParser.json();

gameRouter.ws(`/game/${SEAWAR.NAME}`, seaWarSocket);

gameRouter.listen(wsSeaWarPort, () => {
  console.log(`${SEAWAR.NAME} web socket is runing at port ${wsSeaWarPort}`);
});

export function sendForUser(player, gameId, message) {
  if (typeof message !== "string") {
    message = JSON.stringify(message);
  }

  aWssSeaWar.clients.forEach((client) => {
    if (
      client.id.split(":")[0] === player &&
      client.id.split(":")[1] === gameId
    ) {
      client.send(message);
    }
  });
}

export const gameHttpRouter = new Router();

gameHttpRouter.get("/all", getGamesList);
gameHttpRouter.get("/data", getGameData);
gameHttpRouter.post(
  "/data",
  adminMiddleware(["admin", "moderator"]),
  jsonParser,
  addNewGame
);
gameHttpRouter.put(
  "/data",
  adminMiddleware(["admin", "moderator"]),
  jsonParser,
  editGameData
);
gameHttpRouter.get("/list", getGameList);

gameHttpRouter.get(
  "/comments",
  asyncMiddleware(authorizedUser),
  banedUser,
  getAllComments
);
gameHttpRouter.post(
  "/comments",
  asyncMiddleware(authorizedUser),
  banedUser,
  addComment
);
gameHttpRouter.put(
  "/comments",
  asyncMiddleware(authorizedUser),
  banedUser,
  editComment
);
gameHttpRouter.delete(
  "/comments",
  asyncMiddleware(authorizedUser),
  banedUser,
  removeComment
);
