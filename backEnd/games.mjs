import bodyParser from "body-parser";
import cors from "cors";
import { Router } from "express";
import { asyncMiddleware } from "middleware-async";

import {
  addNewGame,
  editGameData,
  getAllComments,
  getGameData,
  getGameList,
  getGamesList,
  removeComment,
  setComment,
} from "./controllers/game-data-controller.mjs";
import { adminMiddleware } from "./middleware/admin-middleware.mjs";
import { authorizedUser } from "./middleware/authorized-user.mjs";
import { banedUser } from "./middleware/baned-midleware.mjs";

const jsonParser = bodyParser.json();

export const gameHttpRouter = new Router();

gameHttpRouter.use(cors());
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
  jsonParser,
  asyncMiddleware(authorizedUser),
  banedUser,
  setComment
);
gameHttpRouter.delete(
  "/comments",
  jsonParser,
  asyncMiddleware(authorizedUser),
  banedUser,
  removeComment
);
