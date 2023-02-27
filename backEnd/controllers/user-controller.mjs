import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jsonwebtoken from "jsonwebtoken";
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from "uuid";

import { ALWAYS_ADMINS } from "../data/adminsList.mjs";
import { showFormattedError } from "../data/show-error.js";
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
      return res.status(401).json({ message: "Wrong Input Data" });
    }

    const searchUser = userName
      ? await User.findOne({ userName })
      : await User.findOne({ email: email.toLocaleLowerCase() });

    if (!searchUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const newResetToken = uuidv4();
    searchUser.resetToken = newResetToken;
    searchUser.save();

    mailService.sendResetPassEMail(
      searchUser.email,
      searchUser.userName,
      `https://${process.env.HOST}?resetToken=${newResetToken}`
    );

    res.json({
      message: `E-mail sended to ${searchUser.email}`,
    });
  } catch (e) {
    res.status(400).json({ message: "Reset Error" });
    showFormattedError(e);
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
  } catch (err) {
    res.status(400).json({ message: "Password Reset Error" });
    showFormattedError(err);
  }
}

// eslint-disable-next-line consistent-return
export async function changePass(req, res) {
  try {
    const { password, newPassword } = req.body;
    const { userName } = req;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: `User ${userName} not found` });
    }

    const validPass = bcrypt.compareSync(password, user.password);

    if (!validPass) {
      return res
        .status(405)
        .json({ message: `Incorrect password for ${userName}` });
    }

    const hashPass = bcrypt.hashSync(newPassword, 7);
    user.password = hashPass;
    user.resetToken = uuidv4();

    mailService.sendPassChangedEmail(user.email, userName, newPassword);
    user.save();

    res.json({ message: "Password has been changed!" });
  } catch (err) {
    res.status(400).json({ message: "Password Changing Error" });
    showFormattedError(err);
  }
}

// eslint-disable-next-line consistent-return
export async function getNameForNewPass(req, res) {
  try {
    const { resetToken } = req.query;
    const searchUser = await User.findOne({ resetToken });

    if (!searchUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ userName: searchUser.userName });
  } catch (err) {
    res.status(400).json({ message: "Error: Cannot get userName" });
    showFormattedError(err);
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

    const searchUserByEmail = await User.findOne({
      email: email.toLocaleLowerCase(),
    });

    if (searchUserByEmail) {
      return res
        .status(400)
        .json({ message: "User with current email is allredy registred" });
    }

    const hashPass = bcrypt.hashSync(password, 7);
    const userStatus = await UserStatus.findOne({ value: "user" });
    const resetToken = uuidv4();
    const user = new User({
      userName,
      email: email.toLocaleLowerCase(),
      password: hashPass,
      status: [userStatus.value],
      resetToken,
    });
    mailService.sendRegistrEmail(email, userName, password);
    user.save();
    res.json({ message: "New User has been successfully created!" });
  } catch (err) {
    res.status(400).json({ message: "Registration Error" });
    showFormattedError(err);
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
    showFormattedError(err);
  }
}

export async function getUsers(req, res) {
  try {
    const users = req.query.search
      ? await User.find({ userName: { $regex: req.query.search } })
      : await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: "Failed to get users" });
    showFormattedError(err);
  }
}

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.user.id);
    const { userName, email, status, banned, date, image } = user;
    res.json({ userName, email, status, banned, date, image });
  } catch (err) {
    res.status(400).json({ message: "Failed to get user" });
    showFormattedError(err);
  }
}

// eslint-disable-next-line consistent-return
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

    if (ALWAYS_ADMINS.includes(userName) && !user.status.includes("admin")) {
      user.status.push("admin");
      await user.save();

      return res.json({
        message: "You can not changed this admin status!",
        user,
      });
    }

    await user.save();

    res.json({ message: "Status changed", user });
  } catch (err) {
    res.status(400).json({ message: "Failed to set new status" });
    showFormattedError(err);
  }
}

// eslint-disable-next-line consistent-return
export async function deleteUser(req, res) {
  try {
    const { userName } = req.body;

    if (ALWAYS_ADMINS.includes(userName)) {
      return res.json({
        message: "You can not delete this user!",
      });
    }

    const user = await User.findOne({ userName });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      await user.remove();
      res.status(204).json({ message: `User ${userName} has been deleted` });
    }
  } catch (err) {
    res.status(400).json({ message: "Failed to delete user" });
    showFormattedError(err);
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
      showFormattedError(err);
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
    showFormattedError(err);
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
