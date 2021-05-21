const xss = require("xss");

const { User } = require("../../models/userModel");
const { encrypt } = require("../../utils/encryption");
const { getSignedToken } = require("../../utils/signedToken");
const { verification } = require("../mail/verification");

exports.sendVerify = async (req, res) => {
  try {
    let { email } = req.body;
    email = xss(email);
    if (!email) {
      res.json({
        user: undefined,
        message: "Enter your email",
      });
    }
    const encryptedEmail = encrypt(email);

    const user = await User.findOne({ email: encryptedEmail });
    if (user === null) {
      res.json({
        user: undefined,
        message: "User does not exist",
      });
    }
    if (user.isVerified === true) {
      res.json({
        user: user,
        message: "User is already verified",
      });
    }

    const token = getSignedToken(
      user._id,
      process.env.JWT_EMAIL_CONFIRM,
      "20m"
    );
    const updated = await User.findByIdAndUpdate(
      user._id,
      { verifyToken: token },
      { new: true }
    );
    // sends email
    verification(email, token);
    return res.status(200).json(updated);
  } catch (err) {
    console.log("45 err");
    console.log(err);
    res.json({
      user: undefined,
      message: err.message,
    });
  }
};
