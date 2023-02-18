import { Schema, model } from "mongoose";

const gameData = new Schema({
  name: { type: String, unique: true, require: true },
  image: { type: String, default: "" },
  descriptionRu: { type: String, default: "Нет описания" },
  descriptionEn: { type: String, default: "No description" },
  rulesRu: { type: String, default: "Нет правил" },
  rulesEn: { type: String, default: "No rules" },
  fullName: { type: String, default: "" },
  isComingSoon: { type: Boolean, default: false },
});

export const GameData = model("GameData", gameData);
