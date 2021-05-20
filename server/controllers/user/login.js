const bcrypt = require("bcrypt");

const { User } = require("../../models/userModel");
const { encrypt, decrypt } = require("../../utils/encryption");
const { getSignedToken } = require("../../utils/signedToken");

exports.login = async (req, res, next) => {
  try {
    const payload = req.body;

    const { user, token } = await User.findOne({
      email: encrypt(payload.email),
    })
      .exec()
      .then((user) => {
        if (!user) {
          throw new Error("Please enter email or password");
        } else {
          return bcrypt
            .compare(payload.password, user.password)
            .then((res) => {
              if (res) {
                const token = getSignedToken(
                  user._id,
                  process.env.JWT_KEY,
                  "1h"
                );
                const payload = {
                  user,
                  token,
                };
                return payload;
              } else {
                throw new Error("Incorrect password or email, try again");
              }
            })
            .catch((err) => {
              throw new Error("All fields required");
            });
        }
      });
    user.email = decrypt(user.email);
    res.status(200).json({
      token: token,
      user: user,
    });
  } catch (error) {
    console.log(error);
    // TODO: error handling
  }
};
