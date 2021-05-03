const { User } = require("../../models/userModel");
const { Reservation } = require("../../models/reservationModel");
const { Property } = require("../../models/propertyModel");

exports.getReservations = async (req, res) => {
  // console.log("req.params");
  // console.log(req.params);
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const { activeReservations } = user;
    const reservations = await Promise.all(
      activeReservations.map(async (reservationId) => {
        const res = await Reservation.findById(reservationId);
        const property = await Property.findById(res.propertyId);
        // const reservationFull = { ...res };
        // const reservationFull = Object.assign({}, res);
        const reservationFull = JSON.parse(JSON.stringify(res));
        reservationFull.property = property;
        return reservationFull;
      })
    );
    // console.log("reservations");
    // console.log(reservations);
    return res.status(200).send(reservations);
  } catch (err) {
    console.log("getReservations err.message");
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};
