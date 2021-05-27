const { Lock } = require("../../models/lockModel");
const { Reservation } = require("../../models/reservationModel");
// const { resetLock } = require("./utils/lock");
// let debug = require("debug");

exports.openLockAdmin = async (req, res) => {
  console.log("openLockAdmin");
  console.log("req.query");
  console.log(req.query);

  const { h, id, o1, o2 } = req.query;

  let message;
  let openedLock;

  if (h === undefined || h === null || h !== "A3%nm*Wb") {
    message = "wrong tag";
  }
  if (id === undefined || id.length !== 24) {
    message = "wrong id";
  }
  if (o1 === undefined && o2 === undefined) {
    message = "wrong door";
  }

  // ar reikia apsidrausti, kai jau esama o1 open = true? arba o2 open = true?
  if (o1 !== undefined && o1 == 1) {
    try {
      openedLock = await Lock.findByIdAndUpdate(
        id,
        {
          $set: { o1: +o1 },
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
  } else if (o2 !== undefined && o2 == 1) {
    try {
      openedLock = await Lock.findByIdAndUpdate(
        id,
        {
          $set: { o2: +o2 },
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
  return res.send({ lock: openedLock, message: message });
};
