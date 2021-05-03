const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");

const { getSignedToken } = require("../utils/signedToken");

exports.createUser = async (payload) => {
  return User.find({ email: payload.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        throw new Error("User already exist");
      }
      return bcrypt
        .hash(payload.password, 10)
        .then((hashed) => {
          const newUser = new User({
            email: payload.email,
            password: hashed,
          });
          return newUser.save();
        })
        .catch((err) => {
          throw new Error("All fields required");
        });
    });
};

exports.logInUser = (payload) => {
  return User.findOne({ email: payload.email })
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
              return token;
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
};
