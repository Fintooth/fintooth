const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/check-token");
const checkSelfOrAdmin = require("../middleware/check-self-admin");

const PollsController = require("../controllers/polls");

router.get("/", PollsController.poll_get_all);
router.get("/group-polls/:groupId", PollsController.poll_get_all_for_group);
router.get("/:pollId", PollsController.poll_get_one);

router.post("/:groupId", PollsController.poll_create);

router.post("/:pollId/comment", PollsController.poll_add_comment);

router.patch("/:pollId/vote", PollsController.poll_vote);

router.delete(
  "/:pollId/comment/:commentId",
  PollsController.poll_delete_comment
);

router.delete("/:pollId", PollsController.poll_delete);

module.exports = router;
