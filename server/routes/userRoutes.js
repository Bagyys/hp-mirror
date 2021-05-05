const router = require("express").Router();
const { register } = require("../controllers/user/register");
const { login } = require("../controllers/user/login");
const { sendVerify } = require("../controllers/user/sendVerify");
const { getReservations } = require("../controllers/user/getReservations");

// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/send-verify", sendVerify);
router.get("/getReservations/:userId", getReservations);

module.exports = router;
