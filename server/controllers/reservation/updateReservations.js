const { User } = require("../../models/userModel");
const { Reservation } = require("../../models/reservationModel");

exports.updateReservations = async (req, res) => {
  try {
    const now = new Date();
    const activeReservations = await Reservation.find({
      endDate: { $lte: now },
    });
    if (activeReservations) {
      await Promise.all(
        activeReservations.map(async (activeRes) => {
          try {
            const updatedUser = await User.findByIdAndUpdate(
              activeRes.userId,
              {
                $pull: { activeReservations: activeRes._id },
                $push: { pastReservations: activeRes._id },
              },
              { new: true }
            );
          } catch (error) {}
        })
      );
    }

    return res.status(200).send("OK");
  } catch (error) {
    return res.send(error);
  }
};
