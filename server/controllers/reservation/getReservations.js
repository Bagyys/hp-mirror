const { User } = require("../../models/userModel");
const { Reservation } = require("../../models/reservationModel");
const { Property } = require("../../models/propertyModel");

exports.getReservations = async(req, res) => {
    const userId = req.params.userId;
    let message;
    let reservations = [];

    if (userId === undefined || userId === null || userId.length !== 24) {
        message = "bad user identificator"
    }

    try {
        const user = await User.findById(userId);
        if (user) {
            const { activeReservations } = user;
            if (activeReservations.length > 0) {
                try {
                    reservations = await Promise.all(
                        activeReservations.map(async(reservationId) => {
                            const res = await Reservation.findById(reservationId);
                            const property = await Property.findById(res.propertyId);
                            const reservationFull = JSON.parse(JSON.stringify(res));
                            reservationFull.property = property;
                            return reservationFull;
                        })
                    );

                } catch (error) {
                    return res.status(400).json({
                        reservations: undefined,
                        message: error.message,
                    });
                }
            }
        } else {
            message = "such user doesn't exist"
        }

        return res.status(200).send({
            reservations,
            message
        });
    } catch (err) {
        return res.status(400).json({
            reservations: undefined,
            message: err.message,
        });
    }
};