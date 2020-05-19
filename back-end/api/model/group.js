const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  name: { type: String },
  avatar: { type: String, default: "" },
  dateCreated: { type: Date, default: Date.now },
  accounts: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      type: {
        type: String,
        default: "bank",
        enum: ["bank", "cash", "stocks"],
        required: true,
      },
      amount: { type: Number, required: true, default: 0 },
      currency: { type: String, default: "usd", enum: ["usd", "euro", "bgn"] },
      bankAccType: {
        type: String,
        default: "debit",
        enum: ["debit", "credit", "savings"],
      },
      bankAccInterest: {
        rate: Number,
        period: String, // in months
      },
    },
  ],
});

module.exports = mongoose.model("Group", groupSchema);
