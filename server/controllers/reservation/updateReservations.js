const { User } = require("../../models/userModel");
const { Reservation } = require("../../models/reservationModel");

exports.updateReservations = async() => {
    try {
        const now = new Date();
        const activeReservations = await Reservation.find({
            endDate: { $lte: now },
        });
        if (activeReservations) {
            await Promise.all(
                activeReservations.map(async(activeRes) => {
                    try {
                        const updatedUser = await User.findByIdAndUpdate(
                            activeRes.userId, {
                                $pull: { activeReservations: activeRes._id },
                                $push: { pastReservations: activeRes._id },
                            }, { new: true }
                        );
                    } catch (error) {}
                })
            );
        }

    } catch (error) {
        console.log("updateReservations error.message")
        console.log(error.message)
    }
};