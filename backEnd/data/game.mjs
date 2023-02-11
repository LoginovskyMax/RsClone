import { Schema, model } from "mongoose";

const gameData = new Schema({
  name: { type: String, unique: true, require: true },
  descriptionRu: { type: String, default: "Нет описания" },
  descriptionEn: { type: String, default: "No description" },
  rulesRu: { type: String, default: "Нет правил" },
  rulesEn: { type: String, default: "No rules" },
  comments: [{ type: String, ref: "Comment" }],
  raiting: { type: Number, default: 5 },
});

export const GameData = model("GameData", gameData);
