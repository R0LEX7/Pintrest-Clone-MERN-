const mongoose = require("mongoose");
const passport_local_mongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    profilePic: {
      type: String,
    },

    fullName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(passport_local_mongoose);
module.exports = mongoose.model("User", userSchema);
