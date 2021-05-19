const router = require("express").Router();
const { loadUser } = require("../controllers/user/loadUser");
const { register } = require("../controllers/user/register");
const { login } = require("../controllers/user/login");
const { sendVerify } = require("../controllers/user/sendVerify");
const { verify } = require("../controllers/user/verify");

// Routes
router.post("/register", register);
router.post("/login", login);
router.put("/send-verify", sendVerify);
router.put("/verify/:verifyToken", verify);
router.post("/", loadUser);

module.exports = router;
