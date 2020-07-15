const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/check-token");
const checkSelfOrAdmin = require("../middleware/check-self-admin");

const ActivitiesController = require("../controllers/activities");

router.get("/user/:id", ActivitiesController.activity_get_all_for_user);

router.get("/:id", ActivitiesController.activity_get_one);

router.post("/user/:id", ActivitiesController.add_activity);

router.patch("/:activityId", ActivitiesController.edit_activity);

router.delete("/:activityId", ActivitiesController.activities_delete);

module.exports = router;
