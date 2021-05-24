const bcrypt = require("bcrypt");

const { User } = require("../../models/userModel");
const { encrypt, decrypt } = require("../../utils/encryption");
const { getSignedToken } = require("../../utils/signedToken");

exports.login = async (req, res) => {
  try {
    const body = req.body;
    const encryptedEmail = encrypt(body.email);

    let user;
    let token;
    let message;

    const existingUser = await User.findOne({ email: encryptedEmail });

    if (existingUser) {
      try {
        const bcryptResponse = await bcrypt.compare(
          body.password,
          existingUser.password
        );
        if (bcryptResponse) {
          token = getSignedToken(existingUser._id, process.env.JWT_KEY, "1h");
          user = existingUser;
        } else {
          message = "Incorrect password or email";
        }
      } catch (error) {
        message = error.message;
      }
      if (user) {
        user.email = decrypt(user.email);
      }
    } else {
      message = "There is no user with this email";
    }
    return res.json({
      token,
      user,
      message,
    });
  } catch (err) {
    return res.status(400).json({
      token: undefined,
      user: undefined,
      message: err.message,
    });
  }
};
