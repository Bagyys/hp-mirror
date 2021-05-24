const jwt = require("jsonwebtoken");

const { User } = require("../../models/userModel");
const { decrypt } = require("../../utils/encryption");

exports.verify = async (req, res) => {
  const verifyToken = req.params.verifyToken;

  let user;
  let message;

  try {
    const verified = await jwt.verify(
      verifyToken,
      process.env.JWT_EMAIL_CONFIRM
    );
    const now = new Date().getTime();
    if (
      verified !== undefined &&
      verified._id !== undefined &&
      now < verified.iat &&
      now > verified.exp
    ) {
      try {
        user = await User.findById(verified._id);
        let updatedUser;
        if (user && user.verifyToken === verifyToken) {
          updatedUser = await User.findByIdAndUpdate(
            user._id,
            { isVerified: true, verifyToken: "" },
            { new: true }
          );
          if (updatedUser) {
            updatedUser.email = decrypt(updatedUser.email);
            user = updatedUser;
          } else {
            message = "User verification failed";
          }
        } else {
          message = "User verification failed";
        }
      } catch (error) {
        message = error.message;
      }
    } else {
      message = "Verification failed";
    }

    res.json({ user, message });
  } catch (error) {
    return res.status(400).json({
      user: undefined,
      message: error.message,
    });
  }
};
