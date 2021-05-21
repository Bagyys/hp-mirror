const jwt = require("jsonwebtoken");

const { User } = require("../../models/userModel");
const { verification } = require("../mail/verification");
const { encrypt, decrypt } = require("../../utils/encryption");
// const { errorHandling } = require("../../utils/errorHandling/errorHandling");
// const {
//   successHandling,
// } = require("../../utils/errorHandling/successHandling");

exports.verify = async (req, res) => {
  try {
    const verifyToken = req.params.verifyToken;
    try {
      const verified = jwt.verify(verifyToken, process.env.JWT_EMAIL_CONFIRM);
    } catch (err) {
      console.log(err);
      console.log(err.message);
      //   TODO: error handling
    }

    const user = await User.findOne({ verifyToken: verifyToken });
    let updatedUser = user;
    if (user.verifyToken === verifyToken) {
      updatedUser = await User.findByIdAndUpdate(
        user._id,
        { isVerified: true, verifyToken: "" },
        { new: true }
      );
      //   return successHandling(701, userLanguage, res);
    }
    updatedUser.email = decrypt(updatedUser.email);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    // TODO error handling
  }
};
