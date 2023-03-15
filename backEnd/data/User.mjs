import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: { type: String, unique: true, require: true },
  image: { type: String, require: false },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  date: { type: Date, default: Date.now },
  status: [{ type: String, ref: "Status" }],
  resetToken: { type: String, unique: true, require: true },
  banned: { type: Boolean, default: false },
});

export const User = model("User", userSchema);
