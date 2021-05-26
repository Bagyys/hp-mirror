const { Lock } = require("../../models/lockModel");
const { Reservation } = require("../../models/reservationModel");
// const { resetLock } = require("./utils/lock");
// let debug = require("debug");

exports.openLock = async (req, res) => {
  console.log("openDoor");
  console.log("req.query");
  console.log(req.query);
  const { h, lock, reservation, o1, o2 } = req.query;

  let message;
  let reservationObj;
  let openedLock;
  // get:
  // h - metka
  // lock - lock id
  // reservation - reservation id
  // user - user id
  // o1 / o2 - door

  // TODO: error handling

  if (h === undefined || h === null || h !== "A3%nm*Wb") {
    message = "wrong tag";
  }
  if (
    lock === undefined ||
    lock.length !== 24 ||
    reservation === undefined ||
    reservation.length !== 24
  ) {
    message = "wrong id";
  }
  if (o1 === undefined && o2 === undefined) {
    message = "wrong door";
  }

  try {
    reservationObj = await Reservation.findById(data.reservation);
  } catch (error) {
    message = error.message;
  }

  if (reservationObj) {
    const { startDate, endDate } = reservationObj;
    const now = new Date();
    if (now >= startDate && now <= endDate) {
      // ar reikia apsidrausti, kai jau esama o1 open = true? arba o2 open = true?
      if (data.o1 != undefined && data.o1 == 1) {
        try {
          openedLock = await Lock.findByIdAndUpdate(
            data.id,
            {
              $set: { o1: +data.o1 },
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
      } else {
        message = "wrong door";
      }
      if (data.o2 != undefined && data.o2 == 1) {
        try {
          openedLock = await Lock.findByIdAndUpdate(
            data.id,
            {
              $set: { o2: +data.o2 },
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
  }

  return res.send({ lock: openedLock, message: message });
};
