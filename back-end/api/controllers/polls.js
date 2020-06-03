const mongoose = require("mongoose");

const Group = require("../model/group");
const Poll = require("../model/poll");

exports.poll_create = (req, res, next) => {
  const {
    title,
    description,
    creator,
    group,
    members,
    result,
    expires
  } = req.body;
  const poll = new Poll({
    _id: mongoose.Types.ObjectId(),
    title,
    description,
    creator,
    group,
    members,
    result,
    created: Date.now(),
    expires
  });

  poll
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created poll with id: " + poll._id
      });
    })
    .catch(err => {
      req.status(500).json({
        error: err
      });
    });
};

exports.poll_get_all = (req, res, next) => {
  Poll.find()
    .select("_id title description group creator")
    .exec()
    .then(count => {
      res.status(201).json({
        count: count.length,
        polls: count.map(poll => ({
          _id: poll._id,
          title: poll.title,
          description: poll.description,
          creator: poll.creator,
          group: poll.group,
          created: poll.created,
          request: {
            type: "GET DELETE",
            url: "http://localhost:3001/polls/" + poll._id
          }
        }))
      });
    })
    .catch(e => {
      res.status(500).json({
        error: e
      });
    });
};

exports.poll_get_by_id = (req, res, next) => {
  const id = req.params.pollId;
  Poll.findById(pollId)
    .select(
      "_id title description creator group members result votes created expires comments"
    )
    .exec()
    .then(result => {
      if (result) {
        res.status(201).json({
          _id: poll._id,
          title: poll.title,
          description: poll.description,
          creator: poll.creator,
          group: poll.group,
          members: poll.members,
          result: poll.result,
          votes: poll.votes,
          created: poll.created,
          expires: poll.expires,
          comments: poll.comments
        });
      } else {
        res.status(404).json({
          message: `No such poll with id: ${pollId} exists`
        });
      }
    })
    .catch(e => {
      res.status(500).json({
        error: e
      });
    });
};

exports.poll_delete = (req, res, next) => {
  const pollId = req.body.id;
  Poll.deleteOne({ _id: pollId })
    .exec()
    .then(result => {
      res.status(201).json({
        message: "Successully deleted poll with id: " + pollId
      });
    })
    .catch(e => {
      res.status(500).json({
        error: e
      });
    });
};

/*
TODO:
Figure out how to store results
A user votes by sending a request which includes his vote, id, and pollId. So make a function that will handle that logic
Make a function that gets all relevant polls (relevant = has not expired)
Test
*/
