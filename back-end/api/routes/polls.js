const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/check-token");
const checkSelfOrAdmin = require("../middleware/check-self-admin");

const PollsController = require("../controllers/polls");

router.get("/", PollsController.poll_get_all);
router.get("/:pollId", PollsController.poll_get_by_id);

router.post("/:groupId", PollsController.poll_create);

router.patch("/:pollId/make-comment", PollsController.poll_add_comment);
// router.patch("/:pollId/delete-commentt", PollsController.poll_delete_comment);

router.delete("/:pollId", PollsController.poll_delete);

module.exports = router;
