import bodyParser from "body-parser";
import cors from "cors";
import { Router } from "express";
import { asyncMiddleware } from "middleware-async";

import {
  deleteUser,
  getUsers,
  getUser,
  getUserByName,
  login,
  register,
  resetpass,
  setNewPass,
  getNameForNewPass,
  setUserStatus,
  banUser,
  changePass,
} from "./controllers/user-controller.mjs";
import { logger } from "./logger.mjs";
import { adminMiddleware } from "./middleware/admin-middleware.mjs";
import { authorizedUser } from "./middleware/authorized-user.mjs";

const jsonParser = bodyParser.json();

export const router = new Router();

router.use(cors());
router.use(logger);
router.post("/forgotpass", jsonParser, resetpass); // {userName, email}
router.put("/setpass", jsonParser, asyncMiddleware(authorizedUser), changePass); // {password, newPassword}
router.post("/setpass", jsonParser, setNewPass); // {password, resetToken}
router.get("/setpass", jsonParser, getNameForNewPass); // {?resetToken=...}
router.post("/registr", jsonParser, register); // { userName, email, password }
router.post("/login", jsonParser, login); // { userName, password }
router.get("/users", adminMiddleware(["admin", "moderator"]), getUsers);
router.get("/myuser", asyncMiddleware(authorizedUser), getUser);
router.get("/user", adminMiddleware(["admin", "moderator"]), getUserByName);
router.put("/user", jsonParser, adminMiddleware(["admin"]), setUserStatus);
router.delete("/user", jsonParser, adminMiddleware(["admin"]), deleteUser); // { userName }
router.get("/user/ban", adminMiddleware(["admin", "moderator"]), banUser(true));
router.get(
  "/user/unban",
  adminMiddleware(["admin", "moderator"]),
  banUser(false)
);
