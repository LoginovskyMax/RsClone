// eslint-disable-next-line consistent-return
export function banedUser(req, res, next) {
  try {
    if (req.banned) {
      return res.json({ message: "You are banned!" });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: "User not authorized" });
  }
}
