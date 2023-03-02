import { check } from "express-validator";

export function validator() {
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
