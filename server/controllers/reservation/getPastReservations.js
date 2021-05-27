const { User } = require("../../models/userModel");
const { Reservation } = require("../../models/reservationModel");
const { Property } = require("../../models/propertyModel");

exports.getPastReservations = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const { pastReservations } = user;
    const reservations = await Promise.all(
      pastReservations.map(async (reservationId) => {
        const res = await Reservation.findById(reservationId);
        const property = await Property.findById(res.propertyId);
        const reservationFull = JSON.parse(JSON.stringify(res));
        reservationFull.property = property;
        return reservationFull;
      })
    );
    return res.status(200).send(reservations);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
