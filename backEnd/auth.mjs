import bodyParser from "body-parser";
import { Router } from "express";
import { check } from "express-validator";

import { getUsers, login, register, resetpass } from "./controller.mjs";
import { adminMiddleware } from "./token/admin-middleware.mjs";
// import { middleware } from "./token/middleware.mjs";

const jsonParser = bodyParser.json();

export const router = new Router();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validator() {
  return [
    check("username", "Username must not be empty").notEmpty(),
    check("username", "Username must not be less than 3 characters").isLength({
      min: 3,
    }),
    check(
      "username",
      "Username must not be longer than 32 characters"
    ).isLength({
      max: 32,
    }),
    check("password", "Password must not be less than 5 characters").isLength({
      min: 5,
    }),
    check(
      "password",
      "Password must not be longer than 32 characters"
    ).isLength({
      max: 32,
    }),
  ];
}

router.post("/resetpass", jsonParser, resetpass);
router.post("/registr", jsonParser, register);
router.post("/login", jsonParser, login);
router.get("/users", adminMiddleware(["admin", "moderator"]), getUsers);
