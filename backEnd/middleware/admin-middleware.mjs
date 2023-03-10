import jsonwebtoken from "jsonwebtoken";

export function adminMiddleware(statuses) {
  // eslint-disable-next-line func-names, consistent-return
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(403).json({ message: "User not authorized" });
      }

      const { statuses: uStatuses } = jsonwebtoken.verify(
        token,
        process.env.KEY
      );
      const hasStatus = uStatuses.some((status) => statuses.includes(status));

      if (!hasStatus) {
        return res.status(405).json({ message: "You do not have permission" });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: "User not authorized" });
    }
  };
}
