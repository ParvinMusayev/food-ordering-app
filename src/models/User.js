const { Schema } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    validate: (pass) => {
      if (!pass?.length || pass.lenght < 5) {
        new Error("password must be at least 5 characters");
      }
    },
  },
});

export const User = models?.User || model("User", UserSchema);
