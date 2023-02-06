import { GameData } from "../data/game.mjs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getGameData(req, res) {
  try {
    const { name } = req.params;
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
