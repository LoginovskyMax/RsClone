// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcryptjs";
// eslint-disable-next-line import/no-extraneous-dependencies
import { validationResult } from "express-validator";
// eslint-disable-next-line import/no-extraneous-dependencies
import jsonwebtoken from "jsonwebtoken";

import { UserStatus } from "./data/Status.mjs";
import { User } from "./data/User.mjs";
import { S_KEY } from "./key.mjs";

const generateToken = (id, statuses) =>
  jsonwebtoken.sign({ id, statuses }, S_KEY.secret, { expiresIn: "48h" });

// eslint-disable-next-line consistent-return
export async function register(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ message: "Validation error", errors });
    }

    const { userName, password } = req.body;
    const searchUser = await User.findOne({ userName });

    if (searchUser) {
      return res.status(400).json({ message: "User is allredy registred" });
    }

    const hashPass = bcrypt.hashSync(password, 7);
    const userStatus = await UserStatus.findOne({ value: "admin" });
    const user = new User({
      userName,
      password: hashPass,
      status: [userStatus.value],
    });
    user.save();
    res.json("New User has been successfully created!");
  } catch (err) {
    res.status(400).json({ message: "Registration Error" });
  }
}

// eslint-disable-next-line consistent-return
export async function login(req, res) {
  try {
    const { userName, password } = req.body;
    const searchUser = await User.findOne({ userName });

    if (!searchUser) {
      return res.status(404).json({ message: `User ${userName} not found` });
    }

    const validPass = bcrypt.compareSync(password, searchUser.password);

    if (!validPass) {
      return res
        .status(405)
        .json({ message: `Incorrect password for ${userName}` });
    }

    // eslint-disable-next-line no-underscore-dangle
    const token = generateToken(searchUser._id, searchUser.status);

    return res.json({ token });
  } catch (err) {
    res.status(400).json({ message: "Login Error" });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
    console.log(req);
  } catch (err) {
    res.status(400).json({ message: "Failed to get users" });
  }
}

export async function saveStatusesToDB() {
  const userStatus = new UserStatus();
  const adminStatus = new UserStatus({ value: "admin" });
  const moderatorStatus = new UserStatus({ value: "moderator" });

  await userStatus.save();
  await adminStatus.save();
  await moderatorStatus.save();
}
