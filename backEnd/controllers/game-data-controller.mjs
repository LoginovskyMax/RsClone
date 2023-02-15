import { Comment } from "../data/comment.mjs";
import { GameData } from "../data/game.mjs";
import { showFormattedError } from "../data/show-error.js";
import { User } from "../data/User.mjs";
import { games } from "../games/data/games.mjs";
import {
  getCommentsForGame,
  getGameRaiting,
} from "../utils/comments-utils.mjs";

// eslint-disable-next-line consistent-return
export async function getGamesList(_req, res) {
  try {
    const gamesList = await GameData.find();

    if (!gamesList) {
      return res.status(404).json({ message: "Games not found!" });
    }

    const fullGamesList = await Promise.all(
      gamesList.map(async (game) => {
        const raiting = await getGameRaiting(game.name);
        const comments = await getCommentsForGame(game.name);

        const { name, image, descriptionRu, descriptionEn, rulesRu, rulesEn } =
          game;

        return {
          name,
          image,
          descriptionRu,
          descriptionEn,
          rulesRu,
          rulesEn,
          raiting,
          comments,
        };
      })
    );

    res.json(fullGamesList);
  } catch (err) {
    res.status(400).json({ message: "Failed to get games list" });
    showFormattedError(err);
  }
}

export async function getGameData(req, res) {
  try {
    const { name } = req.query;
    const game = await GameData.findOne({ name });

    const raiting = await getGameRaiting(name);
    const comments = await getCommentsForGame(name);

    if (!game) {
      res.status(404).json({ message: "Game not found!" });
    } else {
      const gameRes = {
        // eslint-disable-next-line no-underscore-dangle
        _id: game._id,
        name: game.name,
        image: game.image,
        descriptionRu: game.descriptionRu,
        descriptionEn: game.descriptionEn,
        rulesRu: game.rulesRu,
        rulesEn: game.rulesEn,
        raiting,
        comments,
      };
      res.json(gameRes);
    }
  } catch (err) {
    res.status(400).json({ message: "Failed to get game" });
  }
}

export async function addNewGame(req, res) {
  try {
    const data = req.body;
    const gameData = new GameData(data);
    await gameData.save();
    res.json(gameData);
  } catch (err) {
    res.status(400).json({ message: "Failed to add game" });
    showFormattedError(err);
  }
}

// eslint-disable-next-line consistent-return
export async function editGameData(req, res) {
  try {
    const { name } = req.query;
    const data = req.body;
    const gameData = await GameData.findOne({ name });

    if (!gameData) {
      return res.status(404).json({ message: "Game not found!" });
    }

    if (data.name) gameData.name = data.name;
    if (data.image) gameData.image = data.image;
    if (data.descriptionRu) gameData.descriptionRu = data.descriptionRu;
    if (data.descriptionEn) gameData.descriptionEn = data.descriptionEn;
    if (data.rulesRu) gameData.rulesRu = data.rulesRu;
    if (data.rulesEn) gameData.rulesEn = data.rulesEn;
    if (data.raiting) gameData.raiting = data.raiting;

    await gameData.save();
    res.json(gameData);
  } catch (err) {
    res.status(400).json({ message: "Failed to edit game" });
    showFormattedError(err);
  }
}

export async function getGameList(req, res) {
  try {
    const { name } = req.query;
    const gameKeys = Object.keys(games);
    const gamesList = [];
    gameKeys.forEach((key) => {
      if (
        games[key].gameName === name &&
        !games[key].isStarted &&
        !games[key].winner
      ) {
        gamesList.push({
          name,
          gameId: key,
          player: games[key].players[0].userName,
          maxPlayers: games[key].playersCount,
          playersInGame: games[key].players.length,
        });
      }
    });
    res.json(gamesList);
  } catch (err) {
    res
      .status(400)
      .json({ message: `Failed to get list of games for ${req.query.name}` });
    showFormattedError(err);
  }
}

export async function getAllComments(req, res) {
  try {
    const { gameName: name } = req.query;

    const comments = await getCommentsForGame(name);

    res.json(comments);
  } catch (err) {
    res.status(400).json({ message: "Faild to get commets" });
    console.error(err);
  }
}

// eslint-disable-next-line consistent-return
export async function setComment(req, res) {
  try {
    const { gameName: name } = req.query;
    const { text, raiting } = req.body;
    const { userName } = req;

    const userObj = await User.findOne({ userName });
    if (!userObj) return res.status(401).json({ message: "Wrong User Name" });

    const gameObj = await GameData.findOne({ name });
    if (!gameObj) return res.status(401).json({ message: "Wrong Game Name" });

    // eslint-disable-next-line no-underscore-dangle
    const user = userObj._id;
    // eslint-disable-next-line no-underscore-dangle
    const game = gameObj._id;

    const hasComment = await Comment.findOne({ user, game });

    if (hasComment) {
      if (text) hasComment.text = text;
      if (raiting) hasComment.raiting = raiting;
      hasComment.date = new Date();
      hasComment.save();

      res.json({
        user: userName,
        game: name,
        text: hasComment.text,
        raiting: hasComment.raiting,
        date: hasComment.date,
      });
    } else {
      const comment = new Comment({ user, game, text, raiting });
      comment.save();

      res.json({
        user: userName,
        game: name,
        text: comment.text,
        raiting: comment.raiting,
      });
    }
  } catch (err) {
    res.status(400).json({ message: "Faild to save commet" });
    showFormattedError(err);
  }
}

// eslint-disable-next-line consistent-return
export async function removeComment(req, res) {
  try {
    const { gameName: name } = req.query;
    const { userName } = req;

    const userObj = await User.findOne({ userName });
    if (!userObj) return res.status(401).json({ message: "Wrong User Name" });

    const gameObj = await GameData.findOne({ name });
    if (!gameObj) return res.status(401).json({ message: "Wrong Game Name" });

    // eslint-disable-next-line no-underscore-dangle
    const user = userObj._id;
    // eslint-disable-next-line no-underscore-dangle
    const game = gameObj._id;

    const hasComment = await Comment.findOne({ user, game });
    if (!hasComment)
      return res.status(404).json({ message: "Comment not found" });

    await hasComment.remove();

    res.status(204).json({ message: "" });
  } catch (err) {
    res.status(400).json({ message: "Faild to delete commet" });
    showFormattedError(err);
  }
}
