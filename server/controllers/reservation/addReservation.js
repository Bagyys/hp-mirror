const { Reservation } = require("../../models/reservationModel");
const { User } = require("../../models/userModel");
const { Property } = require("../../models/propertyModel");

exports.addReservation = async (req, res) => {
  const data = req.body;
  const reservationObject = { ...data };
  try {
    const createdReservation = new Reservation(reservationObject);
    console.log("createdReservation");
    console.log(createdReservation);
    await createdReservation.save();

    try {
      const updatedUser = User.findByIdAndUpdate(data.userId, {
        $push: { activeReservations: createdReservation._id },
      });
    } catch (error) {
      console.log("e1");
      return res.status(500).json({ error: err.message });
    }

    // create an object/ objects of propertie's occupiedTime array

    try {
      // const updatedProperty = Property.findByIdAndUpdate(data.propertyId, {
      //   $push: { activeReservations: createdReservation._id },
      // });
    } catch (error) {
      console.log("e2");

      return res.status(500).json({ error: err.message });
    }

    return res.status(200).send(createdReservation);
  } catch (err) {
    console.log("e3 " + err.message);

    return res.status(500).json({ error: err.message });
  }
};
