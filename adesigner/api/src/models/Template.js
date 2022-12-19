const Mongoose = require("mongoose");

const TemplateSchema = new Mongoose.Schema(
  {
    tag: String,
    link : String,
    num : Number,

  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("template", TemplateSchema);