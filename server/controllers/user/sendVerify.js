const xss = require("xss");

const { User } = require("../../models/userModel");
const { encrypt } = require("../../utils/encryption");
const { getSignedToken } = require("../../utils/signedToken");
const { verification } = require("../mail/verification");

exports.sendVerify = async (req, res) => {
  try {
    let { email } = req.body;

    let user;
    let message;

    email = xss(email);
    if (!email) {
      message = "Enter your email";
    }

    const encryptedEmail = encrypt(email);

    user = await User.findOne({ email: encryptedEmail });

    if (user) {
      if (user.isVerified) {
        message = "User is already verified";
      } else {
        const token = getSignedToken(
          user._id,
          process.env.JWT_EMAIL_CONFIRM,
          "20m"
        );
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { verifyToken: token },
          { new: true }
        );
        verification(email, token);
        user = updatedUser;
      }
    } else {
      message = "User does not exist";
    }

    return res.json({
      user,
      message,
    });
  } catch (err) {
    res.status(400).json({
      user: undefined,
      message: err.message,
    });
  }
};
