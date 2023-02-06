import bodyParser from "body-parser";
import { Router } from "express";

import {
  deleteUser,
  getUsers,
  login,
  register,
  resetpass,
  setNewPass,
} from "./controllers/user-controller.mjs";
import { adminMiddleware } from "./middleware/admin-middleware.mjs";
// import { middleware } from "./middleware/middleware.mjs";

const jsonParser = bodyParser.json();

export const router = new Router();

router.post("/forgotpass", jsonParser, resetpass); // {userName, email}
router.post("/setpass", jsonParser, setNewPass); // {password, resetToken}
router.post("/registr", jsonParser, register); // { userName, email, password }
router.post("/login", jsonParser, login); // { userName, password }
router.get("/users", adminMiddleware(["admin", "moderator"]), getUsers);
router.delete(
  "/user",
  jsonParser,
  adminMiddleware(["admin", "moderator"]),
  deleteUser
); // { userName }
