// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from "body-parser";
import { Router } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import { check } from "express-validator";

import { getUsers, login, register } from "./controller.mjs";
import { adminMiddleware } from "./token/adminMW.mjs";
// import { middleware } from "./token/middleware.mjs";

const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

export const router = new Router();

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

router.post("/registr", jsonParser, register, validator);
router.post("/login", jsonParser, login);
router.get("/users", adminMiddleware(["admin", "moderator"]), getUsers);
