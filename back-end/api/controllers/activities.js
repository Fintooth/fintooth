const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const UsersController = require("../controllers/users");

const Activity = require("../model/activity");
const User = require("../model/user");

exports.activity_get_all_for_user = (req, res, next) => {
  const id = req.params.id;
  Activity.find({ $or: [{ user: id }, { group: id }] })
    .select(
      "id type accountSrc accountDest description picture date group amount"
    )
    .sort("-date")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        activities: docs.map((doc) => {
          return {
            id: doc._id,
            amount: doc.amount,
            description: doc.description,
            picture: doc.picture,
            type: doc.type,
            date: doc.date,
            accountSrc: doc.accountSrc,
            accountDest: doc.accountDest,
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
            from: doc.accountSrc,
            to: doc.accountDest,
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
  console.log(req.body);
  const activity = new Activity({
    _id: mongoose.Types.ObjectId(),
    user: req.params.id,
    type: req.body.type,
    description: req.body.description,
    amount: req.body.amount,
    //group: req.body.group,
    picture: req.body.picture,
  });
  if ("Expenditure" === activity.type && req.body.accountSrc) {
    activity.accountSrc = req.body.accountSrc;
    UsersController.change_account_amount(
      activity.user,
      activity.accountSrc,
      -parseFloat(activity.amount)
    )
      .then((result) =>
        activity.save(function (err) {
          if (err) {
            console.log(err);
            return;
          }
          res.status(201).json({
            message: "Activity created",
            activity,
            Location: activity.id,
          });
        })
      )
      .catch((err) => {
        console.log("here2");
        res.status(500).json({
          error: err,
        });
      });
  } else if ("Income" === activity.type && req.body.accountDest) {
    activity.accountDest = req.body.accountDest;
    UsersController.change_account_amount(
      activity.user,
      activity.accountDest,
      parseFloat(activity.amount)
    )
      .then((result) =>
        activity.save(function (err) {
          if (err) {
            console.log(err);
            return;
          }
          res.status(201).json({
            message: "Activity created",
            activity,
            Location: activity.id,
          });
        })
      )
      .catch((err) =>
        res.status(500).json({
          error: err,
        })
      );
  } else if (
    "Move" === activity.type &&
    req.body.accountSrc &&
    req.body.accountDest
  ) {
    activity.accountSrc = req.body.accountSrc;
    activity.accountDest = req.body.accountDest;
    UsersController.change_account_amount(
      activity.user,
      activity.accountSrc,
      -parseFloat(activity.amount)
    ).then((result) =>
      UsersController.change_account_amount(
        activity.user,
        activity.accountDest,
        parseFloat(activity.amount)
      )
        .then((result) =>
          activity.save(function (err) {
            if (err) {
              console.log(err);
              return;
            }
            res.status(201).json({
              message: "Activity created",
              activity,
              Location: activity.id,
            });
          })
        )
        .catch((err) =>
          res.status(500).json({
            error: err,
          })
        )
    );
  } else {
    res.status(400).json({
      message: "Send data according to the activity model",
    });
  }
};

exports.edit_activity = (req, res, next) => {
  const id = req.params.activityId;
  const updateOps = {};
  for (const ops in req.body) {
    if (["type", "description", "amount", "group", "picture"].includes(ops)) {
      updateOps[ops] = req.body[ops];
    }
  }
  switch (updateOps.type) {
    case "Expenditure":
      updateOps.accountSrc = req.body.accountSrc;
      break;
    case "Income":
      updateOps.accountDest = req.body.accountDest;
      break;
    case "Move":
      updateOps.accountSrc = req.body.accountSrc;
      updateOps.accountDest = req.body.accountDest;
      break;
  }
  Activity.findOneAndUpdate(
    { _id: id },
    {
      $set: updateOps,
    }
  )
    .exec()
    .then((doc) => {
      switch (doc.type) {
        case "Expenditure":
          UsersController.change_account_amount(
            doc.user,
            doc.accountSrc,
            doc.amount
          );
          break;
        case "Income":
          UsersController.change_account_amount(
            doc.user,
            doc.accountDest,
            -doc.amount
          );
          break;
        case "Move":
          UsersController.change_account_amount(
            doc.user,
            doc.accountSrc,
            doc.amount
          );
          UsersController.change_account_amount(
            doc.user,
            doc.accountDest,
            -doc.amount
          );
          break;
      }
      switch (updateOps.type) {
        case "Expenditure":
          UsersController.change_account_amount(
            doc.user,
            updateOps.accountSrc,
            -doc.amount
          );
          break;
        case "Income":
          UsersController.change_account_amount(
            doc.user,
            updateOps.accountDest,
            doc.amount
          );
          break;
        case "Move":
          UsersController.change_account_amount(
            doc.user,
            updateOps.accountSrc,
            -doc.amount
          );
          UsersController.change_account_amount(
            doc.user,
            updateOps.accountDest,
            doc.amount
          );
          break;
      }
      res.status(200).json({
        message: "Activity updated and accounts changed accordingly",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.activities_delete = (req, res, next) => {
  Activity.findOneAndDelete({ _id: req.params.activityId })
    .select("type accountSrc accountDest amount user group")
    .exec()
    .then((doc) => {
      console.log(doc);
      switch (doc.type) {
        case "Expenditure":
          UsersController.change_account_amount(
            doc.user,
            doc.accountSrc,
            doc.amount
          );
          break;
        case "Income":
          UsersController.change_account_amount(
            doc.user,
            doc.accountSrc,
            -doc.amount
          );
          break;
        case "Move":
          UsersController.change_account_amount(
            doc.user,
            doc.accountSrc,
            doc.amount
          );
          UsersController.change_account_amount(
            doc.user,
            doc.accountDest,
            -doc.amount
          );
          break;
        default:
          return res.status(404).json({
            message: "Activity not found",
          });
      }
      return res.status(200).json({
        message: "Activity deleted and accounts reset",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
