import { Schema, model } from "mongoose";

const userSchema = new Schema({
  user: { type: "String", ref: "User" },
  text: { type: String, default: "No comment..." },
  date: { type: Date, default: Date.now },
});

export const User = model("User", userSchema);