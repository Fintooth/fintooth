const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/check-token");
const checkSelfOrAdmin = require("../middleware/check-self-admin");

const PollsController = require("../controllers/polls");

router.get("/", PollsController.poll_get_all);

router.post("/:groupId", PollsController.poll_create);

module.exports = router;
