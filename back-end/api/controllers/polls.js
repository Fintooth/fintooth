const mongoose = require("mongoose");

const Poll = require("../model/poll");
const poll = require("../model/poll");

exports.poll_create = (req, res, next) => {
  const groupId = req.params.groupId;
  const { title, description, creator, expires } = req.body;
  const poll = new Poll({
    _id: mongoose.Types.ObjectId(),
    title,
    description,
    creator,
    group: groupId,
    created: Date.now(),
    expires,
  });

  poll
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created poll with id: " + poll._id,
      });
    })
    .catch((err) => {
      req.status(500).json({
        error: err,
      });
    });
};

exports.poll_get_all = (req, res, next) => {
  Poll.find({ expires: { $gt: new Date() } })
    .select("_id title description group creator comments")
    .exec()
    .then((count) => {
      res.status(201).json({
        count: count.length,
        polls: count.map((poll) => ({
          _id: poll._id,
          title: poll.title,
          description: poll.description,
          creator: poll.creator,
          group: poll.group,
          created: poll.created,
          comments: poll.comments,
          request: {
            type: "GET DELETE",
            url: "http://localhost:3001/polls/" + poll._id,
          },
        })),
      });
    })
    .catch((e) => {
      res.status(500).json({
        error: e,
      });
    });
};

exports.poll_get_all_for_group = (req, res, next) => {
  const groupId = req.params.groupId;
  Poll.find({ group: groupId, expires: { $gt: new Date() } })
    .select("_id title description group creator")
    .exec()
    .then((count) => {
      res.status(201).json({
        count: count.length,
        polls: count.map((poll) => ({
          _id: poll._id,
          title: poll.title,
          description: poll.description,
          creator: poll.creator,
          group: poll.group,
          created: poll.created,
          request: {
            type: "GET DELETE",
            url: "http://localhost:3001/polls/" + poll._id,
          },
        })),
      });
    })
    .catch((e) => {
      res.status(500).json({
        error: e,
      });
    });
};

exports.poll_get_one = (req, res, next) => {
  const pollId = req.params.pollId;
  console.log(pollId);
  Poll.findById(pollId)
    .select(
      "_id title description creator group result votes created expires comments members"
    )
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(201).json({
          _id: doc._id,
          title: doc.title,
          description: doc.description,
          creator: doc.creator,
          group: doc.group,
          result: doc.result,
          votes: doc.votes,
          created: doc.created,
          expires: doc.expires,
          comments: doc.comments,
          members: doc.members,
        });
      } else {
        res.status(404).json({
          message: `No such poll with id: ${pollId} exists`,
        });
      }
    })
    .catch((e) => {
      res.status(500).json({
        error: e,
      });
    });
};

exports.poll_add_comment = (req, res, next) => {
  const pollId = req.params.pollId;
  const comment = req.body.comment;
  const commentId = req.body.commentId;
  const authorId = req.body.authorId;
  Poll.updateOne(
    { _id: pollId },
    {
      $push: {
        comments: {
          _id: mongoose.Types.ObjectId(),
          author: authorId,
          comment: comment,
        },
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Comment added",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.poll_delete_comment = (req, res, next) => {
  const { pollId, commentId } = req.params;
  Poll.updateOne(
    { _id: pollId },
    {
      $pull: {
        comments: { _id: commentId },
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Comment deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.poll_delete = (req, res, next) => {
  const pollId = req.params.pollId;
  Poll.deleteOne({ _id: pollId })
    .exec()
    .then((result) => {
      res.status(201).json({
        message: "Successully deleted poll with id: " + pollId,
      });
    })
    .catch((e) => {
      res.status(500).json({
        error: e,
      });
    });
};

exports.poll_vote = (req, res, next) => {
  const pollId = req.params.pollId;
  const vote = req.body.vote;
  const voterId = req.body.voterId;
  Poll.updateOne(
    { _id: pollId, members: { $ne: voterId } },
    {
      $push: {
        votes: vote,
        members: voterId,
      },
    },
    { runValidators: true }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Vote added",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
