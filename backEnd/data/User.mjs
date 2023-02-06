import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  date: { type: Date, default: Date.now },
  status: [{ type: String, ref: "Status" }],
});

export const User = model("User", userSchema);
