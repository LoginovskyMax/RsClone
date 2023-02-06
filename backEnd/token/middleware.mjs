// eslint-disable-next-line import/no-extraneous-dependencies
import jsonwebtoken from "jsonwebtoken";

import { S_KEY } from "../key.mjs";

// eslint-disable-next-line consistent-return
export function middleware(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "User not authorized" });
    }

    const data = jsonwebtoken.verify(token, S_KEY.secret);
    req.user = data;
    next();
  } catch (err) {
    return res.status(403).json({ message: "User not authorized" });
  }
}
