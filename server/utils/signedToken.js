const jwt = require("jsonwebtoken");

exports.getSignedToken = function (id) {
  return jwt.sign({ _id: id }, process.env.JWT_KEY, { expiresIn: "1hr" });
};
