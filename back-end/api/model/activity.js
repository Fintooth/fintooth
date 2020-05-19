const mongoose = require("mongoose");

const activitySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  type: {
    type: String,
    default: "Expenditure",
    enum: ["Expenditure", "Income", "Move"],
  },
  accountSrc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  accountDest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  description: { type: String },
  picture: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", activitySchema);
