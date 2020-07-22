const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let toDecode = req.headers.token;
    if (
      req.headers.authorization &&
      /^Bearer \w/.test(req.headers.authorization)
    ) {
      toDecode = req.headers.authorization.split(" ")[1];
    }
    const decoded = jwt.verify(toDecode, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
