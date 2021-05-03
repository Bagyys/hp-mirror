// import * as jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getSignedToken = function (id) {
  return jwt.sign({ _id: id }, process.env.JWT_KEY, { expiresIn: "1hr" });
};

// export default getSignedToken;
