const router = require("express").Router();
const { addReservation } = require("../controllers/reservation/addReservation");

// Routes
router.post("/addReservation", addReservation);

module.exports = router;
