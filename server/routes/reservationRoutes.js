const router = require("express").Router();
const { addReservation } = require("../controllers/reservation/addReservation");
const {
  getReservations,
} = require("../controllers/reservation/getReservations");
const {
  updateReservations,
} = require("../controllers/reservation/updateReservations");

// Routes
router.post("/addReservation", addReservation);
router.get("/getReservations/:userId", getReservations);
router.put("/updateReservations", updateReservations);

module.exports = router;
