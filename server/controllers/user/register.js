const bcrypt = require("bcrypt");

const { User } = require("../../models/userModel");
const { encrypt, decrypt } = require("../../utils/encryption");
const { getSignedToken } = require("../../utils/signedToken");
const { verification } = require("../mail/verification");

exports.register = async(req, res, next) => {
    try {
        // console.log(req.body);
        const body = req.body;
        const encryptedEmail = encrypt(body.email);
        const { user, userToken, emailToken } = await User.find({ email: encryptedEmail })
            .exec()
            .then((user) => {
                if (user.length > 0) {
                    console.log("User already exist");
                    res.status(400).json({
                        token: undefined,
                        user: undefined,
                    });
                }
                return bcrypt
                    .hash(body.password, 10)
                    .then(async(hashed) => {
                        const newUser = new User({
                            email: encryptedEmail,
                            password: hashed,
                        });
                        const emailToken = getSignedToken(newUser._id, process.env.JWT_EMAIL_CONFIRM, "20m");
                        const userToken = getSignedToken(newUser._id, process.env.JWT_KEY, "1h");
                        newUser.verifyToken = emailToken;
                        await newUser.save();
                        newUser.email = decrypt(encryptedEmail);
                        const payload = {
                            user: newUser,
                            userToken,
                            emailToken
                        };
                        return payload;
                    })
                    .catch((err) => {
                        console.log("err.message");
                        console.log(err.message);
                        // throw new Error("All fields required");
                    });
            });

        const decryptedEmail = decrypt(encryptedEmail);
        verification(decryptedEmail, emailToken);
        res.status(200).json({
            token: userToken,
            user: user,
        });
    } catch (error) {
        console.log(error);
        // TODO: error handling
    }
};