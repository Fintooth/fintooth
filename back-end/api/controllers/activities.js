const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const Activity = require("../model/activity");
const User = require("../model/user");

exports.activity_get_all_for_user = (req, res, next) => {
  const id = req.params.id;
  Activity.find({ user: id })
    .select(
      "id type accountSrc accountDest description picture date group amount"
    )
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        activities: docs.map((doc) => {
          return {
            id: doc._id,
            amount: doc.amount,
            type: doc.type,
            date: doc.date,
            request: {
              type: "GET DELETE",
              url: "http://localhost:3001/activities/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.activity_get_one = (req, res, next) => {
  const id = req.params.id;
  Activity.find({ _id: id })
    .select(
      "id type accountSrc accountDest description picture date group amount"
    )
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        activities: docs.map((doc) => {
          return {
            id: doc._id,
            amount: doc.amount,
            type: doc.type,
            date: doc.date,
            description: doc.description,
            account_source: doc.accountSrc,
            account_destination: doc.accountDest,
            picture: doc.picture,
            group: doc.group,
            request: {
              type: "GET DELETE",
              url: "http://localhost:3001/activities/" + id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.add_activity = (req, res, next) => {
  const activity = new Activity({
    _id: mongoose.Types.ObjectId(),
    user: req.params.id,
    type: req.body.type,
    description: req.body.description,
    amount: req.body.amount,
    group: req.body.group,
    accountSrc: req.accountSrc,
    accountDest: req.accountDest,
  });
  activity
    .save()
    .then((result) =>
      res.status(201).json({
        message: "Activity created",
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
};

exports.edit_activity = (req, res, next) => {
  const id = req.params.activityId;
  const updateOps = {};
  for (const ops in req.body) {
    if (["type", "description", "amount", "group", "picture"].includes(ops)) {
      updateOps[ops] = req.body[ops];
    }
  }
  Activity.updateOne(
    { _id: id },
    {
      $set: updateOps,
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Activity updated",
        request: {
          type: "GET PATCH DELETE",
          url: "http://localhost:3001/edit-activity/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.activities_delete = (req, res, next) => {
  Activity.deleteOne({ _id: req.params.activityId })
    .exec()
    .then((response) => {
      res.status(200).json({
        message: "Activity deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
