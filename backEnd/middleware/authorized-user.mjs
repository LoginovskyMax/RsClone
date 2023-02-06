import jsonwebtoken from "jsonwebtoken";

// eslint-disable-next-line consistent-return
export function authorizedUser(req, res, next) {
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
    next();
  } catch (err) {
    return res.status(403).json({ message: "User not authorized" });
  }
}
