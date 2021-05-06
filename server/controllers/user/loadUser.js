const { decrypt } = require("../../utils/encryption");
const { User } = require("../../models/userModel");

exports.loadUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) throw Error("No users exist");
    user.email = decrypt(user.email);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};