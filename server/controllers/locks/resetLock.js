const { Lock } = require("../../models/lockModel");
const { reset } = require("./utils/lock");
let debug = require("debug");

exports.resetLock = async (req, res) => {
  console.log("reset");
  console.log("req.query");
  console.log(req.query);
  const data = req.query;

  if (!data.h || data.h !== "A3%nm*Wb") {
    return res.status(404).send("netu metki");
  }
  if (data.id === undefined || data.id.length !== 24) {
    console.log("data id undefined or too short");
    console.log("send error");
    return res.status(404).send("nepravelnyj id");
  }
  try {
    const resetLock = await Lock.findByIdAndUpdate(
      data.id,
      {
        $set: {
          o1: 0,
          o2: 0,
        },
        $push: {
          [`lockClosed.o1`]: { time: new Date(), user: "reset button click" },
          [`lockClosed.o2`]: { time: new Date(), user: "reset button click" },
        },
      },
      { new: true }
    );
    console.log("reset");
    if (resetLock === undefined || resetLock === null) {
      return res.status(404).send("e11");
    } else {
      return res.status(200).send(resetLock);
    }
  } catch (err) {
    console.log("send error");
    console.log(err);
    return res.status(404).send("nepravelnyj id");
  }
};
