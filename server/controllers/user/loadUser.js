const { decrypt } = require("../../utils/encryption");
const { User } = require("../../models/userModel");

exports.loadUser = async(req, res) => {
    const { userId } = req.body;

    let user;
    let message;

    try {
        user = await User.findById(userId);
        if (user) {
            user.email = decrypt(user.email);
        } else {
            message = "No user was found"
        }

        res.json({ user, message });
    } catch (error) {
        return res.status(400).json({
            user: undefined,
            message: error.message,
        });
    }
};