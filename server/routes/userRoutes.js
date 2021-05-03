const router = require("express").Router();
const { getReservations } = require("../controllers/user/getReservations");
const { login } = require("../controllers/user/login");
const { register } = require("../controllers/user/register");

// Routes
router.post("/register", register);
router.post("/login", login);
router.get("/getReservations/:userId", getReservations);

module.exports = router;
