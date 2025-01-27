const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      require: true,
    },

    email: {
      type: String,
      unique: true,

      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
// User => users

module.exports = UserModel;
