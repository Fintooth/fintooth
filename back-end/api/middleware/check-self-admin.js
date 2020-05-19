module.exports = (req, res, next) => {
  // req.userData is set by check-auth.js
  if (req.params.userId === req.userData.id || req.userData.admin) {
    next();
  } else {
    res.status(403).json({
      message:
        "Operation forbidden. You must be admin or the user that is modified.",
    });
  }
};
