const { Schema, model, models } = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", UserSchema);
