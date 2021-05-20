const { Lock } = require("../../models/lockModel");
// const { resetLock } = require("./utils/lock");
// let debug = require("debug");

exports.getAllLocks = async (req, res) => {
  const data = req.query;

  if (!data.h || data.h !== "A3%nm*Wb") {
    return res.status(404).send("netu metki");
  }

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
};
