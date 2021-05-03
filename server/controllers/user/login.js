const UserServices = require("../../services/user.js");

exports.login = async (req, res, next) => {
  try {
    const payload = req.body;
    const token = await UserServices.logInUser(payload);
    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};
