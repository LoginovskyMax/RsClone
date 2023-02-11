import { GameData } from "../data/game.mjs";

export async function getGamesList(_req, res) {
  try {
    const games = await GameData.find();

    if (!games) {
      res.status(404).json({ message: "Games not found!" });
    } else {
      res.json(games);
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
