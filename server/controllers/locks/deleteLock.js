const { Lock } = require("../../models/lockModel");
// const { resetLock } = require("./utils/lock");
// let debug = require("debug");

exports.deleteLock = async (req, res) => {
  console.log("deleteLock");
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
  let deletedLock;
  try {
    deletedLock = await Lock.deleteOne({ _id: data.id });
    console.log("deletedLock");
    console.log(deletedLock);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
  if (deletedLock.deletedCount === 1) {
    try {
      const locks = await Lock.find(
        {},
        { lockOpened: 0, lockClosed: 0, createdAt: 0, updatedAt: 0, __v: 0 }
      );
      console.log("found");
      if (locks !== undefined || locks !== null) {
        return res.status(200).send(locks);
      } else {
        console.log("send error");
        return res.status(404).send("oshibka");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.status(404).send("No doors found by ID");
  }
};
