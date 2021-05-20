const jwt = require("jsonwebtoken");

const { User } = require("../../models/userModel");
const { encrypt } = require("../../utils/encryption");
const { getSignedToken } = require("../../utils/signedToken");
const { verification } = require("../mail/verification");

exports.sendVerify = async(req, res) => {
    try {
        let { email } = req.body;
        email = xss(email);
        if (!email) {
            return res.status(400).json({ msg: "Enter your email" });
        }
        const encryptedEmail = encrypt(email);

        const user = await User.findOne({ email: encryptedEmail });
        if (user === null) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        if (user.isVerified === true) {
            return res.status(400).json({ msg: "User is already verified" });
        }

        // sets successs message
        let successMessage = "Email confirmation link sent";

        // signs email confirm token
        // const token = jwt.sign({ _id: user._id }, process.env.JWT_EMAIL_CONFIRM, {
        //     expiresIn: "20m",
        // });
        const token = getSignedToken(user._id, process.env.JWT_EMAIL_CONFIRM, "20m");
        const updated = await User.findByIdAndUpdate(user._id, { verifyToken: token }, { new: true });
        // sends email
        verification(email, token);
        return res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};