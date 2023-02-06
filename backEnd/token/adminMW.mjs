// eslint-disable-next-line import/no-extraneous-dependencies
import jsonwebtoken from "jsonwebtoken";

import { S_KEY } from "../key.mjs";

// eslint-disable-next-line consistent-return
export function adminMiddleware(statuses) {
  // eslint-disable-next-line func-names, consistent-return
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    console.log(req.headers);

    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(403).json({ message: "User not authorized" });
      }

      const { statuses: uStatuses } = jsonwebtoken.verify(token, S_KEY.secret);
      console.log("uStatuses", uStatuses);
      const hasStatus = uStatuses.some((status) => statuses.includes(status));

      if (!hasStatus) {
        return res.status(405).json({ message: "You do not have permission" });
      }

      next();
    } catch (err) {
      console.error(err);

      return res.status(403).json({ message: "User not authorized" });
    }
  };
}
