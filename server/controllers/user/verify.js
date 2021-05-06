const jwt = require("jsonwebtoken");
// const xss = require("xss");

const { User } = require("../../models/userModel");
const { verification } = require("../mail/verification");
const { encrypt, decrypt } = require("../../utils/encryption");
// const { errorHandling } = require("../../utils/errorHandling/errorHandling");
// const {
//   successHandling,
// } = require("../../utils/errorHandling/successHandling");

// locale tavo draugas
exports.verify = async (req, res) => {
  console.log("verify");
  try {
    const verifyToken = req.params.verifyToken;
    console.log("verifyToken");
    console.log(verifyToken);
    try {
      const verified = jwt.verify(verifyToken, process.env.JWT_EMAIL_CONFIRM);
      console.log("verified");
      console.log(verified);
    } catch (err) {
      console.log(err.message);
      //   return errorHandling(704, userLanguage, res);
    }

    const user = await User.findOne({ verifyToken: verifyToken });
    console.log("user before update");
    console.log(user);
    // if (!user) {
    //   return errorHandling(704, userLanguage, res);
    // }

    if (user.verifyToken === verifyToken) {
      await user.updateOne(
        { $set: { isVerified: true, verifyToken: "" } },
        { new: true }
      );
      //   return successHandling(701, userLanguage, res);
    }
    console.log("user after update");
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ msg: 'Nuoroda neteisinga arba nebegalioja' });
    // return res.status(500).json({ error: err.message });
  }
};
