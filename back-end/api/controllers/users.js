const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

var deleteFolderRecursive = function (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const User = require("../model/user");

exports.users_get_all = (req, res, next) => {
  User.find()
    .select("nickname groups email dateCreated _id")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        users: docs.map((doc) => {
          return {
            email: doc.email,
            nickname: doc.nickname,
            dateCreated: doc.dateCreated,
            id: doc._id,
            groups: doc.groups,
            request: {
              type: "GET DELETE",
              url: "http://localhost:3001/users/" + doc._id,
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

exports.users_get_one = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("email nickname admin dateCreated groups accounts _id")
    //.populate("groups.group", "name")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          email: doc.email,
          nickname: doc.nickname,
          dateCreated: doc.dateCreated,
          groups: doc.groups,
          accounts: doc.accounts,
          id: doc._id,
          admin: doc.admin,
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

exports.users_get_accounts = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("accounts")
    .exec()
    .then((docs) => {
      if (docs) {
        res.status(200).json({
          accounts: docs.accounts,
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

exports.users_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((users) => {
      if (users.length >= 1) {
        return res
          .status(422)
          .json({ message: "Email is in use by other user" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              nickname: req.body.nickname,
              password: hash,
            });
            user
              .save()
              .then((result) =>
                res.status(201).json({
                  message: "User created",
                })
              )
              .catch((err) =>
                res.status(500).json({
                  error: err,
                })
              );
          }
        });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.users_login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, response) => {
        if (err || !response) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        const token = jwt.sign(
          {
            email: user.email,
            admin: user.admin,
            nickname: user.nickname,
            id: user._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          message: "Auth successful",
          token: token,
          user: {
            id: user._id,
            email: user.email,
            nickname: user.nickname,
            admin: user.admin,
            accounts: user.accounts,
          },
        });
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
};

exports.add_account = (req, res, next) => {
  const userId = req.params.userId;
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
  User.updateOne(
    { _id: userId },
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

exports.change_account_amount = (userId, accountId, amount) => {
  console.log(userId, accountId, amount);
  return User.updateOne(
    { _id: userId },
    { $inc: { "accounts.$[element].amount": amount } },
    {
      arrayFilters: [{ "element._id": { $eq: accountId } }],
    }
  ).exec();
};

exports.users_patch = (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops in req.body) {
    if (["email", "nickname"].includes(ops)) {
      updateOps[ops] = req.body[ops];
    }
  }
  User.updateOne(
    { _id: id },
    {
      $set: updateOps,
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User updated",
        request: {
          type: "GET PATCH DELETE",
          url: "http://localhost:3001/users/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.users_change_password = (req, res, next) => {
  console.log(req.body.password);
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      const id = req.params.userId;
      User.updateOne(
        { _id: id },
        {
          $set: { password: hash },
        }
      )
        .exec()
        .then((result) => {
          res.status(200).json({
            message: "User password updated",
            request: {
              type: "GET PATCH DELETE",
              url: "http://localhost:3001/users/" + id,
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
};

exports.users_delete = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((response) => {
      deleteFolderRecursive("./uploads/" + req.params.userId + "/");
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.account_delete = (req, res, next) => {
  const { accId, userId } = req.params;
  User.updateOne(
    { _id: userId },
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
