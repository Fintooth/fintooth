const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const Group = require("../model/group");
const User = require("../model/user");
const { domainToASCII } = require("url");

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
    },
    { runValidators: true }
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

exports.remove_user = (req, res, next) => {
  const id = req.params.groupId;
  const userId = req.body.userId;
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
      res.status(200).json({
        message: "User with id " + userId + " removed from group with id " + id,
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
      $pull: {
        groups: id,
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Group with id " + id + " removed from user with id " + userId,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.account_delete = (req, res, next) => {
  const id = req.params.accId;
  Group.update(
    {},
    {
      $pull: {
        accounts: {
          _id: id,
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
