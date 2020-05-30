const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const Group = require("../model/group");
const User = require("../model/user");

exports.create_group = (req, res, next) => {
  const group = new Group({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
  });
  group
    .save()
    .then((result) =>
      res.status(201).json({
        message: "Group created with id" + group._id,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
};

exports.add_user = (req, res, next) => {
  const id = req.params.groupId;
  const userId = req.body.userId;
  Group.update(
    { _id: id },
    {
      $push: {
        members: {
          _id: userId,
        },
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User with id " + userId + "added to group with id " + id,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  User.update(
    { _id: userId },
    {
      $push: {
        groups: {
          _id: id,
        },
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Group with id " + id + "added to user with id " + userId,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.groups_get_one = (req, res, next) => {
  const groupId = req.params.groupId;
  Group.findById(groupId)
    .select("id name members dateCreated accounts")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          id: doc._id,
          name: doc.name,
          dateCreated: doc.dateCreated,
          members: doc.members,
          accounts: doc.accounts,
          requestAll: {
            type: "GET",
            url: "http://localhost:3001/groups",
          },
        });
      } else {
        res.status(404).json({
          message: "No valid entry for provided ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.add_account = (req, res, next) => {
  const id = req.params.groupId;
  const name = req.body.name;
  const type = req.body.type;
  const amount = req.body.amount;
  const currency = req.body.currency;
  const bankAccType = req.body.bankAccType;
  const rate = req.body.rate;
  const period = req.body.period;
  Group.update(
    { _id: id },
    {
      $push: {
        accounts: {
          _id: mongoose.Types.ObjectId(),
          name: name,
          type: type,
          amount: amount,
          currency: currency,
          bankAccType: bankAccType,
          bankAccInterest: {
            rate: rate,
            period: period,
          },
        },
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Account created",
        request: {
          type: "GET PATCH DELETE",
          url: "http://localhost:3001/groups/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// exports.remove_user = (req, res, next) => {
//   const id = req.params.groupId;
//   const userId = req.body.userId;
//   Group.findOneAndUpdate(
//     { _id: id },
//     {
//       $pull: {
//         members: {
//           User: userId,
//         },
//       },
//     }
//   )
//     .exec()
//     .then((result) => {
//       res.status(200).json({
//         message: "User with id " + userId + " removed from group with id " + id,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//       });
//     });

//   //   User.findByIdAndUpdate(
//   //     { _id: userId },
//   //     {
//   //       $pull: {
//   //         groups: {
//   //           _id: id,
//   //         },
//   //       },
//   //     }
//   //   )
//   //     .exec()
//   //     .then((result) => {
//   //       res.status(200).json({
//   //         message: "Group with id " + id + " removed from user with id " + userId,
//   //       });
//   //     })
//   //     .catch((err) => {
//   //       res.status(500).json({
//   //         error: err,
//   //       });
//   //     });
// };
