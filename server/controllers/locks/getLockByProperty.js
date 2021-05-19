const { Lock } = require("../../models/lockModel");

exports.getLockByProperty = async (req, res) => {
  console.log("getLockByProperty");
  const id = req.params.id;

  try {
    const lock = await Lock.findOne(
      { property: id },
      { lockOpened: 0, lockClosed: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    );
    console.log("found");
    if (lock !== undefined || lock !== null) {
      return res.status(200).send(lock);
    } else {
      console.log("send error");
      return res.status(404).send("no lock found");
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
