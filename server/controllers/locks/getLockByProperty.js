const { Lock } = require("../../models/lockModel");

exports.getLockByProperty = async (req, res) => {
  const id = req.params.id;
  try {
    const lock = await Lock.findOne(
      { property: id },
      { lockOpened: 0, lockClosed: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    );
    if (lock !== undefined || lock !== null) {
      return res.status(200).send(lock);
    } else {
      return res.status(404).send("no lock found");
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
