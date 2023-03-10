/* eslint-disable no-underscore-dangle */
import { GameData } from "../data/game.mjs";
import { User } from "../data/User.mjs";
import { Winner } from "../data/winner.mjs";
import { logger } from "../logger.mjs";

// eslint-disable-next-line consistent-return
export async function addWinner(req, res) {
  try {
    const data = req.body;

    if (!req.userName) {
      return res.status(405).json({ message: "User is not authorized" });
    }

    const user = await User.findOne({ userName: req.userName });

    if (!user) {
      return res.status(405).json({ message: "User is not authorized" });
    }

    data.user = user._id;

    if (user.banned) {
      return res.status(405).json({ message: "User is banned" });
    }

    const game = await GameData.findOne({ name: data.game });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    data.game = game._id;

    const winner = new Winner(data);
    await winner.save();
    res.json({
      _id: winner._id,
      userName: user.userName,
      gameName: game.name,
      points: winner.points,
      date: winner.date,
    });
  } catch (err) {
    res.status(400).json({ message: "Failed to add winner" });
    logger.error(err);
  }
}

const getPositionForGame = async (gameId, user) => {
  const usersSet = new Set();
  const winners = await Winner.find({ game: gameId });
  const res = winners
    .sort((a, b) => b._doc.points - a._doc.points)
    .filter((winner) => {
      if (usersSet.has(winner.user.toString())) return false;
      usersSet.add(winner.user.toString());

      return true;
    })
    .map((obj, i) => {
      const newObj = { ...obj._doc };
      newObj.position = i + 1;

      return newObj;
    })
    .find((winner) => winner.user.toString() === user._id.toString()) || {
    position: -1,
  };

  return res;
};

// eslint-disable-next-line consistent-return
export async function getWinners(req, res) {
  try {
    const { game } = req.query;
    const { userName: queryUserName } = req.query;

    if (!req.userName) {
      return res.status(405).json({ message: "User is not authorized" });
    }

    if (game) {
      const currentGame = await GameData.findOne({ name: game });

      if (!currentGame) {
        return res.status(404).json({ message: "Game not found" });
      }

      const winners = await Winner.find({ game: currentGame._id });

      const fullList = (
        await Promise.all(
          winners.map(async (winner) => {
            const userName = (await User.findById(winner.user))?.userName;
            if (!userName) winner.remove();

            return {
              _id: winner._id,
              userName,
              gameName: currentGame.name,
              points: winner.points,
              date: winner.date,
            };
          })
        )
      )
        .filter((winner) => winner.userName)
        .sort((a, b) => b.points - a.points);

      const resList = [];
      const usersSet = new Set();
      fullList.forEach((winner) => {
        if (!usersSet.has(winner.userName)) {
          resList.push(winner);
          usersSet.add(winner.userName);
        }
      });

      res.json(resList);
    } else {
      let user = await User.findOne({ userName: req.userName });

      if (!user) {
        return res.status(405).json({ message: "User is not authorized" });
      }

      if (queryUserName) {
        user = await User.findOne({ userName: queryUserName });
      }

      if (!user) {
        return res.status(405).json({ message: "User not found" });
      }

      const wins = await Winner.find({ user: user._id });

      const fullList = (
        await Promise.all(
          wins.map(async (winner) => {
            const gameName = (await GameData.findById(winner.game))?.name ?? "";
            const position =
              (await getPositionForGame(winner.game, user))?.position ?? -1;
            if (!gameName || !position) winner.remove();

            return {
              _id: winner._id,
              userName: user.userName,
              gameName,
              points: winner.points,
              date: winner.date,
              position,
            };
          })
        )
      )
        .filter((winner) => winner.gameName !== "" && winner.position !== -1)
        .sort((a, b) => b.points - a.points);

      const resList = [];
      const gamesSet = new Set();
      fullList.forEach((winner) => {
        if (!gamesSet.has(winner.gameName)) {
          resList.push(winner);
          gamesSet.add(winner.gameName);
        }
      });

      res.json(resList);
    }
  } catch (err) {
    res.status(400).json({ message: "Failed to get winner" });
  }
}
