import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  game: { type: Schema.Types.ObjectId, ref: "GameData" },
  text: { type: String, default: "No comment..." },
  raiting: { type: Number, default: 5 },
  date: { type: Date, default: Date.now },
});

export const Comment = model("Comment", commentSchema);
