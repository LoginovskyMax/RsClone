import jsonwebtoken from "jsonwebtoken";

import { User } from "../data/User.mjs";

// eslint-disable-next-line consistent-return
export async function authorizedUser(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "User not authorized" });
    }

    const data = jsonwebtoken.verify(token, process.env.KEY);
    req.user = data;
    const user = await User.findById(data.id);

    if (!user) {
      return res.status(403).json({ message: "User not authorized" });
    }

    req.userName = user ? user.userName : null;
    req.banned = user ? user.banned : false;
    next();
  } catch (err) {
    return res.status(403).json({ message: "User not authorized" });
  }
}
