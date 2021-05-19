const router = require("express").Router();
const { addReservation } = require("../controllers/reservation/addReservation");
const { getReservations } = require("../controllers/reservation/getReservations");

// Routes
router.post("/addReservation", addReservation);
router.get("/getReservations/:userId", getReservations);

module.exports = router;
