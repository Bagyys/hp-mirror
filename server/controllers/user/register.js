const bcrypt = require("bcrypt");

const { User } = require("../../models/userModel");
const { encrypt } = require("../../utils/encryption");
const { getSignedToken } = require("../../utils/signedToken");

exports.register = async (req, res, next) => {
  try {
    console.log("req.body");
    console.log(req.body);
    const body = req.body;
    const encryptedEmail = encrypt(body.email);
    // console.log("encryptedEmail");
    // console.log(encryptedEmail);
    // const user = await User.findOne({ email: encryptedEmail });
    // // const user = await User.findOne({ email: encrypt(body.email) });
    // console.log("user");
    // console.log(user);
    const { user, token } = await User.find({ email: encryptedEmail })
      .exec()
      .then((user) => {
        // console.log("user");
        // console.log(user);
        if (user.length > 0) {
          console.log("User already exist");
          // throw new Error("User already exist");
        }
        return bcrypt
          .hash(body.password, 10)
          .then(async (hashed) => {
            // console.log("hashed");
            // console.log(hashed);
            const newUser = new User({
              email: encryptedEmail,
              password: hashed,
            });
            // console.log("newUser");
            // console.log(newUser);
            const token = getSignedToken(newUser._id);
            // console.log("token");
            // console.log(token);
            await newUser.save();
            const payload = {
              user: newUser,
              token,
            };
            console.log("payload");
            console.log(payload);
            return payload;
          })
          .catch((err) => {
            console.log("err.message");
            console.log(err.message);
            throw new Error("All fields required");
          });
      });
    console.log("before return from controler");
    console.log("token");
    console.log(token);
    console.log("user");
    console.log(user);
    res.status(200).json({
      token: token,
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};
