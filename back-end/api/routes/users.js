const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/check-token");
const checkSelfOrAdmin = require("../middleware/check-self-admin");

const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/" + req.params.userId + "/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    if (fs.existsSync(dir + "avatar.jpg")) {
      fs.unlinkSync(dir + "avatar.jpg");
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    const name = "avatar" + extension;
    cb(null, name);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb("File not in required format: jpg", false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const UsersController = require("../controllers/users");

router.get("/", UsersController.users_get_all);

router.get("/:userId/accounts", UsersController.users_get_accounts);

router.get("/:userId", UsersController.users_get_one);

router.post("/signup", UsersController.users_signup);

router.post("/login", UsersController.users_login);

router.post("/:userId/accounts", UsersController.add_account);

router.patch(
  "/change-avatar/:userId",
  checkToken,
  checkSelfOrAdmin,
  upload.single("avatar"),
  (req, res, next) =>
    res.status(200).json({
      message: "Avatar uploaded",
    })
);

router.patch(
  "/change-password/:userId",
  // checkToken,
  // checkSelfOrAdmin,
  UsersController.users_change_password
);

router.patch(
  "/:userId",
  checkToken,
  checkSelfOrAdmin,
  UsersController.users_patch
);

router.delete(
  "/:userId",
  checkToken,
  checkSelfOrAdmin,
  UsersController.users_delete
);

router.delete("/:userId/accounts/:accId", UsersController.account_delete);

module.exports = router;
