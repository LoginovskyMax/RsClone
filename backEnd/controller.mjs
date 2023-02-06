import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jsonwebtoken from "jsonwebtoken";
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from "uuid";

import { UserStatus } from "./data/status.mjs";
import { User } from "./data/user.mjs";
import { mailService } from "./mail/mail-service.js";

const generateToken = (id, statuses) =>
  jsonwebtoken.sign({ id, statuses }, process.env.KEY, { expiresIn: "60d" });

// eslint-disable-next-line consistent-return
export async function resetpass(req, res) {
  try {
    const { userName, email } = req.body;
    const searchUser = userName
      ? await User.findOne({ userName })
      : await User.findOne({ email });
    mailService.sendResetPassEMail(
      searchUser.email,
      searchUser.userName,
      `https://${process.env.HOST}/resetpass/${searchUser.resetToken}`
    );

    return res.redirect(process.env.CLIENT_URL);
  } catch (e) {
    res.status(400).json({ message: "Reset Error" });
  }
}

// eslint-disable-next-line consistent-return
export async function setNewPass(req, res) {
  try {
    const { password, resetToken } = req.body;
    const searchUser = await User.findOne({ resetToken });

    if (!searchUser) {
      return res.status(400).json({ message: "User not found" });
    }

    searchUser.password = password;
    searchUser.save();
    mailService.sendPassChangedEmail(
      searchUser.email,
      searchUser.userName,
      password
    );
    res.json({ message: "Password has been changed!" });
  } catch (e) {
    res.status(400).json({ message: "Password Reset Error" });
  }
}

// eslint-disable-next-line consistent-return
export async function register(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ message: "Validation error", errors });
    }

    const { userName, email, password } = req.body;
    const searchUser = await User.findOne({ userName });

    if (searchUser) {
      return res.status(400).json({ message: "User is allredy registred" });
    }

    const hashPass = bcrypt.hashSync(password, 7);
    const userStatus = await UserStatus.findOne({ value: "admin" });
    const resetToken = uuidv4();
    const user = new User({
      userName,
      email,
      password: hashPass,
      status: [userStatus.value],
      resetToken,
    });
    await mailService.sendRegistrEmail(email, userName, password);
    user.save();
    res.json({ message: "New User has been successfully created!" });
  } catch (err) {
    console.log(err);
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

    return res.cookie({ token });
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
