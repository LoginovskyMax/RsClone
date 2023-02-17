import { Schema, model } from "mongoose";

const winnerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  game: { type: Schema.Types.ObjectId, ref: "GameData" },
  points: { type: Number, default: -1 },
  date: { type: Date, default: Date.now },
});

export const Winner = model("winners", winnerSchema);
