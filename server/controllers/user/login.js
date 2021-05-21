const bcrypt = require("bcrypt");

const { User } = require("../../models/userModel");
const { encrypt, decrypt } = require("../../utils/encryption");
const { getSignedToken } = require("../../utils/signedToken");

exports.login = async (req, res, next) => {
  try {
    const payload = req.body;

    const encryptedEmail = encrypt(req.body.email);

    const existingUser = await User.findOne({ email: encryptedEmail });
    if (existingUser) {
      const { user, token } = await bcrypt
        .compare(payload.password, existingUser.password)
        .then((res) => {
          if (res) {
            const token = getSignedToken(
              existingUser._id,
              process.env.JWT_KEY,
              "1h"
            );
            const payload = {
              user,
              token,
            };
            return payload;
          } else {
            res.json({
              token: undefined,
              user: undefined,
              message: "Incorrect password or email, try again",
            });
          }
        })
        .catch((err) => {
          res.json({
            token: undefined,
            user: undefined,
            message: err.message,
          });
        });
      user.email = decrypt(user.email);
      res.status(200).json({
        token: token,
        user: user,
      });
    } else {
      res.json({
        token: undefined,
        user: undefined,
        message: "There is no user with this email",
      });
    }
  } catch (err) {
    res.json({
      token: undefined,
      user: undefined,
      message: err.message,
    });
  }
};
