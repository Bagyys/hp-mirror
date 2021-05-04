const bcrypt = require("bcrypt");

const { User } = require("../../models/userModel");
const { encrypt } = require("../../utils/encryption");

exports.login = async (req, res, next) => {
  try {
    const payload = req.body;
    // const token = await UserServices.logInUser(payload);

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
                const token = getSignedToken(user._id);
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
              console.log("err.message");
              console.log(err.message);
              throw new Error("All fields required");
            });
        }
      });

    res.status(200).json({
      token: token,
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};
