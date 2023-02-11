import bodyParser from "body-parser";
import { Router } from "express";

import {
  deleteUser,
  getUsers,
  getUser,
  login,
  register,
  resetpass,
  setNewPass,
  setUserStatus,
} from "./controllers/user-controller.mjs";
import { adminMiddleware } from "./middleware/admin-middleware.mjs";
import { authorizedUser } from "./middleware/authorized-user.mjs";

const jsonParser = bodyParser.json();

export const router = new Router();

router.post("/forgotpass", jsonParser, resetpass); // {userName, email}
router.post("/setpass", jsonParser, setNewPass); // {password, resetToken}
router.post("/registr", jsonParser, register); // { userName, email, password }
router.post("/login", jsonParser, login); // { userName, password }
router.get("/users", adminMiddleware(["admin", "moderator"]), getUsers);
router.get("/user", authorizedUser, getUser);
router.post(
  "/user",
  jsonParser,
  adminMiddleware(["admin", "moderator"]),
  setUserStatus
);
router.delete(
  "/user",
  jsonParser,
  adminMiddleware(["admin", "moderator"]),
  deleteUser
); // { userName }
