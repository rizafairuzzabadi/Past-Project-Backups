const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    name: String,
    surname: String,
    username: String,
    password: String,
    email: String,
    role: String,
    likes: [Number],
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("user", UserSchema);
