const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    name: String,
    surname: String,
    username: String,
    password: String,
    email: String,
    role: String,
    name: String,
    address: String,
    // likes: {
    //     type: Mongoose.Types.ObjectId,
    //     ref: "template",
    //   },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("user", UserSchema);
