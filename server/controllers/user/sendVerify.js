const jwt = require("jsonwebtoken");

const { User } = require("../../models/userModel");
const { encrypt } = require("../../utils/encryption");
const { verification } = require("../mail/verification");

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
    if (user === null) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    if (user.isVerified === true) {
      return res.status(400).json({ msg: "User is already verified" });
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
