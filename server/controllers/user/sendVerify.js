const { User } = require("../../models/userModel");
const jwt = require("jsonwebtoken");
// const { errorHandling } = require("../../utils/errorHandling/errorHandling");
// const {
//   successHandling,
// } = require("../../utils/errorHandling/successHandling");

// locale tavo draugas
exports.sendVerify = async (req, res) => {
  console.log("verify");
  try {
    const verifyToken = req.params.verifyToken;

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
      await user.updateOne({ $set: { isVerified: true, verifyToken: "" } });
      //   return successHandling(701, userLanguage, res);
    }
    console.log("user after update");
    console.log(user);
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ msg: 'Nuoroda neteisinga arba nebegalioja' });
    // return res.status(500).json({ error: err.message });
  }
};
