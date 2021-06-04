const { Lock } = require("../../models/lockModel");
const { Reservation } = require("../../models/reservationModel");

exports.openLock = async(req, res) => {
    const { h } = req.query;
    const { lockId, reservationId, door } = req.body;

    let message;
    let reservation;
    let openedLock;

    if (h === undefined || h === null || h !== "A3%nm*Wb") {
        return res.json({
            lock: undefined,
            message: "wrong tag",
        });
    }
    if (
        lockId === undefined ||
        lockId.length !== 24 ||
        reservationId === undefined ||
        reservationId.length !== 24
    ) {
        return res.json({
            lock: undefined,
            message: "wrong id",
        });
    }
    if (door === undefined) {
        return res.json({
            lock: undefined,
            message: "wrong door",
        });
    }

    try {
        reservation = await Reservation.findById(reservationId);

        if (reservation) {
            const { startDate, endDate } = reservation;
            const now = new Date();
            if (now >= startDate && now <= endDate) {
                // ar reikia apsidrausti, kai jau esama o1 open = true? arba o2 open = true?
                if (door === "o1") {
                    try {
                        openedLock = await Lock.findByIdAndUpdate(
                            lockId, {
                                $set: { o1: 1 },
                                $push: {
                                    [`lockOpened.o1`]: { time: new Date(), user: "button click" },
                                },
                            }, { new: true }
                        );
                    } catch (error) {
                        return res.status(400).json({
                            lock: undefined,
                            message: error.message,
                        });
                    }
                } else if (door === "o2") {
                    try {
                        openedLock = await Lock.findByIdAndUpdate(
                            lockId, {
                                $set: { o2: 1 },
                                $push: {
                                    [`lockOpened.o2`]: { time: new Date(), user: "button click" },
                                },
                            }, { new: true }
                        );
                    } catch (error) {
                        return res.json({
                            lock: undefined,
                            message: error.message,
                        });
                    }
                } else {
                    return res.json({
                        lock: undefined,
                        message: "wrong door",
                    });
                }
            } else {
                return res.json({
                    lock: undefined,
                    message: "unauthorised door opening" // TODO: kokia fraze?
                });
            }
        } else {
            return res.json({
                lock: undefined,
                message: "no reservation found",
            });
        }

        return res.send({ lock: openedLock, message: message });
    } catch (error) {
        return res.status(400).json({
            lock: undefined,
            message: error.message,
        });
    }
};