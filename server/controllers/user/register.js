const bcrypt = require("bcrypt");

const { User } = require("../../models/userModel");
const { encrypt, decrypt } = require("../../utils/encryption");
const { getSignedToken } = require("../../utils/signedToken");
const { verification } = require("../mail/verification");

exports.register = async (req, res) => {
  try {
    const body = req.body;
    const encryptedEmail = encrypt(body.email);

    let user;
    let token;
    let message;

    const existingUser = await User.findOne({ email: encryptedEmail });

    if (!existingUser) {
      try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        if (hashedPassword) {
          user = new User({
            email: encryptedEmail,
            password: hashedPassword,
          });

          const emailToken = getSignedToken(
            user._id,
            process.env.JWT_EMAIL_CONFIRM,
            "20m"
          );

          token = getSignedToken(user._id, process.env.JWT_KEY, "1h");

          user.verifyToken = emailToken;

          await user.save();

          user.email = decrypt(encryptedEmail);

          const decryptedEmail = decrypt(encryptedEmail);

          verification(decryptedEmail, emailToken);
        } else {
          message = "An unexpected error occured";
        }
      } catch (error) {
        message = error.message;
      }
    } else {
      message = "There is a user registered with this email";
    }

    return res.json({
      token,
      user,
      message,
    });
  } catch (err) {
    res.json({
      token: undefined,
      user: undefined,
      message: err.message,
    });
  }
};
