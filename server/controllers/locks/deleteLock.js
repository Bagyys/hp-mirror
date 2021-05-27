const { Lock } = require("../../models/lockModel");
const { Property } = require("../../models/propertyModel");
// const { resetLock } = require("./utils/lock");
// let debug = require("debug");

exports.deleteLock = async (req, res) => {
  const data = req.query;

  if (!data.h || data.h !== "A3%nm*Wb") {
    return res.status(404).send("netu metki");
  }
  if (data.id === undefined || data.id.length !== 24) {
    return res.status(404).send("nepravelnyj id");
  }
  let deletedLock;
  try {
    deletedLock = await Lock.deleteOne({ _id: data.id });
    updatedProperty = await Property.findOneAndUpdate(
      { lock: data.id },
      { $unset: { lock: "" } }
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  if (deletedLock.deletedCount === 1) {
    try {
      const locks = await Lock.find(
        {},
        { lockOpened: 0, lockClosed: 0, createdAt: 0, updatedAt: 0, __v: 0 }
      );
      if (locks !== undefined || locks !== null) {
        return res.status(200).send(locks);
      } else {
        return res.status(404).send("oshibka");
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.status(404).send("No doors found by ID");
  }
};
