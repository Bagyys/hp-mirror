const router = require("express").Router();
const { addReservation } = require("../controllers/reservation/addReservation");
const {
    getReservations,
} = require("../controllers/reservation/getReservations");
const {
    cancelUserReservation
} = require("../controllers/reservation/cancelUserReservation");
const {
    getPastReservations,
} = require("../controllers/reservation/getPastReservations");
const {
    updateReservations,
} = require("../controllers/reservation/updateReservations");

// Routes
router.post("/addReservation", addReservation);
router.get("/getReservations/:userId", getReservations);
router.post("/cancelUserReservation/:userId", cancelUserReservation);
router.get("/getPastReservations/:userId", getPastReservations);
router.put("/updateReservations", updateReservations);

module.exports = router;