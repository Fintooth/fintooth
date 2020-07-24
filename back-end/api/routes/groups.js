const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/check-token");
const checkSelfOrAdmin = require("../middleware/check-self-admin");

const GroupsController = require("../controllers/groups");

router.get("/:groupId", GroupsController.groups_get_one);
router.get("/", GroupsController.groups_get_all);
//router.get("/user-groups/:userId", GroupsController.groups_get_all_for_user);

router.post("/create", GroupsController.create_group);
router.post("/:groupId/add-user", GroupsController.add_user);
router.post("/:groupId/accounts", GroupsController.add_account);

router.delete("/:groupId/remove-user", GroupsController.remove_user);
router.delete("/:groupId/accounts/:accId", GroupsController.account_delete);

module.exports = router;
