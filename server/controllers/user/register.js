const bcrypt = require("bcrypt");

const { User } = require("../../models/userModel");
const { encrypt, decrypt } = require("../../utils/encryption");
const { getSignedToken } = require("../../utils/signedToken");
const { verification } = require("../mail/verification");

exports.register = async (req, res, next) => {
  try {
    const body = req.body;
    const encryptedEmail = encrypt(body.email);

    const existingUser = await User.findOne({ email: encryptedEmail });
    if (!existingUser) {
      const { user, userToken, emailToken } = await bcrypt
        .hash(body.password, 10)
        .then(async (hashed) => {
          const newUser = new User({
            email: encryptedEmail,
            password: hashed,
          });
          const emailToken = getSignedToken(
            newUser._id,
            process.env.JWT_EMAIL_CONFIRM,
            "20m"
          );
          const userToken = getSignedToken(
            newUser._id,
            process.env.JWT_KEY,
            "1h"
          );
          newUser.verifyToken = emailToken;
          await newUser.save();
          newUser.email = decrypt(encryptedEmail);
          const payload = {
            user: newUser,
            userToken,
            emailToken,
          };
          return payload;
        })
        .catch((err) => {
          res.status(400).json({
            token: undefined,
            user: undefined,
            message: err.message,
          });
        });

      const decryptedEmail = decrypt(encryptedEmail);
      verification(decryptedEmail, emailToken);
      console.log("userToken");
      console.log(userToken);
      console.log("user");
      console.log(user);
      res.status(200).json({
        token: userToken,
        user: user,
      });
    } else {
      res.json({
        token: undefined,
        user: undefined,
        message: "There is a user registered with this email",
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
