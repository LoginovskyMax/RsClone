import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jsonwebtoken from "jsonwebtoken";
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from "uuid";

import { UserStatus } from "../data/Status.mjs";
import { User } from "../data/User.mjs";
import { mailService } from "../mail/mail-service.js";

const generateToken = (id, statuses) =>
  jsonwebtoken.sign({ id, statuses }, process.env.KEY, { expiresIn: "60d" });

// eslint-disable-next-line consistent-return
export async function resetpass(req, res) {
  try {
    const { userName, email } = req.body;

    if (!userName && !email) {
      res.status(401).json({ message: "Wrong Input Data" });
    }

    const searchUser = userName
      ? await User.findOne({ userName })
      : await User.findOne({ email });

    if (!searchUser) {
      res.status(404).json({ message: "User not found" });
    }

    const newResetToken = uuidv4();
    searchUser.resetToken = newResetToken;
    searchUser.save();

    mailService.sendResetPassEMail(
      searchUser.email,
      searchUser.userName,
      `https://${process.env.HOST}/resetpass?resetToken=${newResetToken}`
    );

    res.json({
      message: `E-mail sended to ${searchUser.email}`,
      resetToken: searchUser.resetToken,
    });
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
      return res.status(404).json({ message: "User not found" });
    }

    const hashPass = bcrypt.hashSync(password, 7);
    searchUser.password = hashPass;
    const newResetToken = uuidv4();
    searchUser.resetToken = newResetToken;
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

    res.cookie("token", token, {
      maxAge: 60 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: true,
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: "Login Error" });
  }
}

export async function getUsers(_req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: "Failed to get users" });
  }
}

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.user.id);
    const { userName, email, status, banned, date } = user;
    res.json({ userName, email, status, banned, date });
  } catch (err) {
    res.status(400).json({ message: "Failed to get user" });
  }
}

export async function setUserStatus(req, res) {
  try {
    const { userName, status } = req.body;
    const user = await User.findOne({ userName });
    user.status = [];
    await user.save();

    for (let i = 0; i < status.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const stat = await UserStatus.findOne({ value: status[i] });
      user.status.push(stat.value);
    }

    await user.save();

    res.json({ message: "Status changed", user });
  } catch (err) {
    res.status(400).json({ message: "Failed to set new status" });
  }
}

export async function deleteUser(req, res) {
  try {
    const { userName } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      await user.remove();
      res.status(204).json({ message: `User ${userName} has been deleted` });
    }
  } catch (err) {
    res.status(400).json({ message: "Failed to delete user" });
  }
}

export function banUser(banned) {
  return async function ban(req, res) {
    try {
      const { userName } = req.query;
      const user = await User.findOne({ userName });

      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        user.banned = banned;
        await user.save();
        res.json({
          message: `User ${userName} has been ${
            banned ? "banned" : "unbanned"
          }`,
        });
      }
    } catch (err) {
      res.status(400).json({ message: "Failed to ban user" });
    }
  };
}

export async function getUserByName(req, res) {
  try {
    const { userName } = req.query;
    const user = await User.findOne({ userName });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(400).json({ message: "Failed to get user" });
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

export async function checkUser(userName, token) {
  const { id: _id } = jsonwebtoken.decode(token);
  const searchUser = await User.findById({ _id });

  return searchUser && searchUser.userName === userName;
}
