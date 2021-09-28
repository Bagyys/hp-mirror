const jwt = require("jsonwebtoken");

const { User } = require("../../models/userModel");
const { decrypt } = require("../../utils/encryption");

exports.verify = async (req, res) => {
  const verifyToken = req.params.verifyToken;
  console.log("verify token");
  console.log(verifyToken);

  let user;
  let message;

  try {
    const verified = await jwt.verify(
      verifyToken,
      process.env.JWT_EMAIL_CONFIRM
    );
    console.log("verified");
    console.log(verified);
    console.log("verified iat");
    console.log(verified.iat);

    const now = new Date().getTime() / 1000;
    console.log("now");
    console.log(now);

    if (
      verified !== undefined &&
      verified._id !== undefined &&
      now >= verified.iat &&
      now <= verified.exp
    ) {
      try {
        console.log("atejo iki cia");
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
      console.log("failed???");
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
