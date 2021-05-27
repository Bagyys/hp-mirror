const { Lock } = require("../../models/lockModel");
const { Reservation } = require("../../models/reservationModel");
// const { resetLock } = require("./utils/lock");
// let debug = require("debug");

exports.openLock = async (req, res) => {
  console.log("openLock");
  console.log("req.query");
  console.log(req.query);
  console.log("req.body");
  console.log(req.body);
  const { h } = req.query;
  const { lockId, reservationId, door } = req.body;

  let message;
  let reservation;
  let openedLock;

  if (h === undefined || h === null || h !== "A3%nm*Wb") {
    message = "wrong tag";
  }
  if (
    lockId === undefined ||
    lockId.length !== 24 ||
    reservationId === undefined ||
    reservationId.length !== 24
  ) {
    message = "wrong id";
  }
  if (door === undefined) {
    message = "wrong door";
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
              lockId,
              {
                $set: { o1: 1 },
                $push: {
                  [`lockOpened.o1`]: { time: new Date(), user: "button click" },
                },
              },
              { new: true }
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
              lockId,
              {
                $set: { o2: 1 },
                $push: {
                  [`lockOpened.o2`]: { time: new Date(), user: "button click" },
                },
              },
              { new: true }
            );
          } catch (error) {
            return res.status(400).json({
              lock: undefined,
              message: error.message,
            });
          }
        } else {
          message = "wrong door";
        }
      } else {
        message = "unauthorised door opening"; // TODO: kokia fraze?
      }
    } else {
      message = "no reservation found";
    }

    return res.send({ lock: openedLock, message: message });
  } catch (error) {
    return res.status(400).json({
      lock: undefined,
      message: error.message,
    });
  }
};
