import bodyParser from "body-parser";
import cors from "cors";
import { Router } from "express";
import { asyncMiddleware } from "middleware-async";

import { addWinner, getWinners } from "./controllers/win-controller.mjs";
import { logger } from "./logger.mjs";
import { authorizedUser } from "./middleware/authorized-user.mjs";

const jsonParser = bodyParser.json();

export const winRouter = new Router();
winRouter.use(cors());
winRouter.use(logger);

winRouter.post("/data", asyncMiddleware(authorizedUser), jsonParser, addWinner);
winRouter.get("/data", asyncMiddleware(authorizedUser), getWinners);
