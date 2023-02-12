import { Comment } from "../data/comment.mjs";
import { GameData } from "../data/game.mjs";
import { User } from "../data/User.mjs";
import { games } from "../games/data/games.mjs";

export async function getGamesList(_req, res) {
  try {
    const gamesList = await GameData.find();

    if (!gamesList) {
      res.status(404).json({ message: "Games not found!" });
    } else {
      res.json(gamesList);
    }
  } catch (err) {
    res.status(400).json({ message: "Failed to get games list" });
  }
}

export async function getGameData(req, res) {
  try {
    const { name } = req.query;
    const game = await GameData.findOne({ name });

    if (!game) {
      res.status(404).json({ message: "Game not found!" });
    } else {
      res.json(game);
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
  }
}

export async function getAllComments(req, res) {
  try {
    const { gameName: name } = req;

    const comments = (await Comment.find())
      .map(async (comment) => {
        const { text, raiting, date } = comment;
        const userName = await User.findById(comment.user);
        const gameName = await GameData.findById(comment.game);

        return { userName, gameName, text, raiting, date };
      })
      .filter((comment) => (name ? name === comment.gameName : true));

    res.json(comments);
  } catch (err) {
    res.status(400).json({ message: "Faild to get commets" });
    console.error(err);
  }
}

export async function addComment(req, res) {
  try {} catch(err) {}
}

export async function removeComment(req, res) {
  try {} catch(err) {}
}

export async function editComment(req, res) {
  try {} catch(err) {}
}
