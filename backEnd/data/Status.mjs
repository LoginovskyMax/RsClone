import { Schema, model } from "mongoose";

const statusSchema = new Schema({
  value: { type: String, unique: true, default: "user" },
});

export const UserStatus = model("UserStatus", statusSchema);
