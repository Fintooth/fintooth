const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const Group = require("../model/group");
const User = require("../model/user");
const { domainToASCII } = require("url");
const { group } = require("console");

exports.create_group = (req, res, next) => {
  const userId = req.body.userId;
  const avatar = req.body.avatar;

  const groupId = mongoose.Types.ObjectId();
  const group = new Group({
    _id: groupId,
    name: req.body.name,
    members: [mongoose.Types.ObjectId(userId)],
    avatar: avatar,
  });
  group
    .save()
    .then((result) =>
      User.updateOne(
        { _id: userId },
        {
          $addToSet: {
            groups: {
              _id: groupId,
            },
          },
        }
      )
        .exec()
        .then((result) => {
          res.status(200).json({
            message: "Group created and user added to group",
            Location: "/groups/" + groupId,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
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
      $addToSet: {
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
      $addToSet: {
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
    .populate("members", "nickname email _id")
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

exports.groups_get_all = (req, res, next) => {
  Group.find()
    .select("id name members dateCreated accounts")
    .exec()
    .then((docs) => {
      if (docs) {
        res.status(200).json({
          count: docs.length,
          groups: docs.map((doc) => {
            return {
              name: doc.name,
              dateCreated: doc.dateCreated,
              id: doc._id,
              members: doc.members,
              accounts: doc.accounts,
              request: {
                type: "GET DELETE",
                url: "http://localhost:3001/groups/" + doc._id,
              },
            };
          }),
        });
      } else {
        res.status(404).json({
          message: "No created groups",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// exports.groups_get_all_for_user = (req, res, next) => {
//   const userId = req.params.userId;
//   Group.find({ members: userId })
//     .select("id name members dateCreated accounts")
//     .exec()
//     .then((docs) => {
//       if (docs) {
//         res.status(200).json({
//           count: docs.length,
//           groups: docs.map((doc) => {
//             return {
//               name: doc.name,
//               dateCreated: doc.dateCreated,
//               id: doc._id,
//               members: doc.members,
//               accounts: doc.accounts,
//               request: {
//                 type: "GET DELETE",
//                 url: "http://localhost:3001/groups/" + doc._id,
//               },
//             };
//           }),
//         });
//       } else {
//         res.status(404).json({
//           message: "No created groups",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// };

exports.add_account = (req, res, next) => {
  const groupId = req.params.groupId;
  const {
    name,
    type = "bank",
    amount = 0,
    currency = "usd",
    bankAccType = "debit",
    bankAccInterestRate = 0,
    bankAccInterestPeriod = 12,
  } = req.body;
  const id = mongoose.Types.ObjectId();
  Group.updateOne(
    { _id: groupId },
    {
      $push: {
        accounts: {
          _id: id,
          name: name,
          type: type,
          amount: amount,
          currency: currency,
          bankAccType: bankAccType,
          bankAccInterest: {
            rate: bankAccInterestRate,
            period: bankAccInterestPeriod,
          },
        },
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Account created",
        Location: id,
        account: {
          _id: id,
          name: name,
          type: type,
          amount: amount,
          currency: currency,
          bankAccType: bankAccType,
          bankAccInterest: {
            rate: bankAccInterestRate,
            period: bankAccInterestPeriod,
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.remove_user = (req, res, next) => {
  const id = req.params.groupId;
  const userId = req.params.userId;
  Group.updateOne(
    { _id: id },
    {
      $pull: {
        members: userId,
      },
    }
  )
    .exec()
    .then((result) => {
      User.update(
        { _id: userId },
        {
          $pull: {
            groups: id,
          },
        }
      )
        .exec()
        .then((result) => {
          res.status(200).json({
            message: "The user was removed from the group",
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.account_delete = (req, res, next) => {
  const { accId, groupId } = req.params;
  Group.updateOne(
    { _id: groupId },
    {
      $pull: {
        accounts: {
          _id: accId,
        },
      },
    }
  )
    .exec()
    .then((response) => {
      res.status(200).json({
        message: "Account deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.change_account_amount = (groupId, accountId, amount) => {
  return Group.updateOne(
    { _id: groupId },
    { $inc: { "accounts.$[element].amount": amount } },
    {
      arrayFilters: [{ "element._id": { $eq: accountId } }],
    }
  ).exec();
};
