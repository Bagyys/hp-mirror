const { Lock } = require("../../models/lockModel");

exports.getUnassignedLocks = async (req, res) => {
  console.log("getUnassignedLocks");
  console.log("req.query");
  console.log(req.query);
  const data = req.query;

  if (!data.h || data.h !== "A3%nm*Wb") {
    return res.status(404).send("netu metki");
  }

  try {
    const locks = await Lock.find(
      { property: { $exists: false } },
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
    return res.status(500).json({ error: err.message });
  }
};
