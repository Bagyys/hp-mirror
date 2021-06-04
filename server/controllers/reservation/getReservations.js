const { User } = require("../../models/userModel");
const { Reservation } = require("../../models/reservationModel");
const { Property } = require("../../models/propertyModel");

exports.getReservations = async(req, res) => {
    const userId = req.params.userId;
    let message;
    let reservations;

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
                            // TODO: try catches for these requests
                            let reservation;
                            let property
                            try {
                                reservation = await Reservation.findById(reservationId);
                                if (!reservation) message = "Reservation wasn't found"
                            } catch (error) {
                                return res.json({
                                    reservations: undefined,
                                    message: error.message,
                                });
                            }
                            try {
                                property = await Property.findById(reservation.propertyId);
                                if (!property) message = "Property of reservation wasn't found"

                            } catch (error) {
                                return res.json({
                                    reservations: undefined,
                                    message: error.message,
                                });
                            }
                            const reservationFull = JSON.parse(JSON.stringify(reservation));
                            reservationFull.property = property;
                            return reservationFull;
                        })
                    );

                } catch (error) {
                    return res.json({
                        reservations: undefined,
                        message: error.message,
                    });
                }
            }
        } else {
            message = "such user doesn't exist"
        }

        return res.send({
            reservations,
            message
        });
    } catch (err) {
        return res.json({
            reservations: undefined,
            message: err.message,
        });
    }
};