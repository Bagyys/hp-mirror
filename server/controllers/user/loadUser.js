const { decrypt } = require("../../utils/encryption");
const { User } = require("../../models/userModel");

exports.loadUser = async (req, res) => {
  // console.log("req.headers");
  // console.log(req.headers);
  // const token
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) throw Error("No users exist");
    user.email = decrypt(user.email);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};
