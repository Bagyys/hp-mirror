const jwt = require("jsonwebtoken");
const xss = require("xss");

const { User } = require("../../models/userModel");
const verification = require("../mail/mail");
const { encrypt } = require("../../utils/encryption");
// const { errorHandling } = require("../../utils/errorHandling/errorHandling");
// const {
//   successHandling,
// } = require("../../utils/errorHandling/successHandling");

// locale tavo draugas
exports.sendVerify = async (req, res) => {
  console.log("sendVerify");
  try {
    let { email } = req.body;
    email = xss(email);
    if (!email) {
      return res.status(400).json({ msg: "Enter your email" });
    }
    const encryptedEmail = encrypt(email);

    const user = await User.findOne({ email: encryptedEmail });
    if (user.isVerified === true) {
      return res.status(400).json({ msg: "User is already verified" });
    }
    if (user === null) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // sets successs message
    let successMessage = "Email confirmation link sent";

    // signs email confirm token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_EMAIL_CONFIRM, {
      expiresIn: "20m",
    });
    // sends email
    verification(email, token);
    await user.updateOne({ verifyToken: token });
    return res.status(200).json({ msg: successMessage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
