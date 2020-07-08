const mongoose = require("mongoose");
const { text } = require("body-parser");

const pollSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String },
  description: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  votes: [
    {
      type: String,
      default: "Abstained",
      enum: ["For", "Against", "Abstained"],
    },
  ],
  result: {
    type: Array,
    default: [0, 0, 0],
  },
  created: { type: Date, default: Date.now },
  expires: { type: Date },
  comments: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      date: { type: Date, default: Date.now },
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: String,
    },
  ],
});

module.exports = mongoose.model("Poll", pollSchema);
