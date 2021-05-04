const bcrypt = require("bcrypt");

const { User } = require("../../models/userModel");
const { encrypt } = require("../../utils/encryption");

exports.register = async (req, res, next) => {
  try {
    console.log("req.body");
    console.log(req.body);
    const body = req.body;
    const encryptedEmail = encrypt(body.email);
    console.log("encryptedEmail");
    console.log(encryptedEmail);
    const user = await User.findOne({ email: encryptedEmail });
    // const user = await User.findOne({ email: encrypt(body.email) });
    console.log("user");
    console.log(user);
    // const { user, token } = await User.find({ email: encrypt(body.email) })
    //   .exec()
    //   .then((user) => {
    //     console.log("user");
    //     console.log(user);
    //     if (user.length > 0) {
    //       throw new Error("User already exist");
    //     }
    //     return bcrypt
    //       .hash(body.password, 10)
    //       .then((hashed) => {
    //         console.log("hashed");
    //         console.log(hashed);
    //         const newUser = new User({
    //           email: encrypt(body.email),
    //           password: hashed,
    //         });
    //         console.log("newUser");
    //         console.log(newUser);
    //         const token = getSignedToken(newUser._id);
    //         console.log("token");
    //         console.log(token);
    //         const payload = {
    //           user: newUser.save(),
    //           token,
    //         };
    //         console.log("payload");
    //         console.log(payload);
    //         return payload;
    //       })
    //       .catch((err) => {
    //         throw new Error("All fields required");
    //       });
    //   });
    // res.status(200).json({
    //   token: token,
    //   user: user,
    // });
  } catch (error) {
    console.log(error);
  }
};
