const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  paid: { type: Boolean, required: true, default: false },
  nickname: { type: String },
  dateCreated: { type: Date, default: Date.now },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
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
      currency: { type: String, default: "usd", enum: ["usd", "eur", "bgn"] },
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

module.exports = mongoose.model("User", userSchema);
