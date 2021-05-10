const { Lock } = require("../../models/lockModel");
const { Property } = require("../../models/propertyModel");
// const { socketConnection } = require("../../utils/socket");

// let debug = require("debug");

exports.assignLock = async (req, res) => {
  console.log("assignLock");
  console.log("req.body");
  console.log(req.body);
  const { propertyId, lockId } = req.body;
  try {
    const lock = await Lock.findByIdAndUpdate(
      lockId,
      { property: propertyId },
      { new: true }
    );
    const property = await Property.findByIdAndUpdate(
      propertyId,
      { lock: lockId },
      { new: true }
    );
    console.log("lock");
    console.log(lock);
    console.log("property");
    console.log(property);
    if (lock && property) {
      return res.status(200).send("ok");
    } else {
      return res.status(400).send("error");
    }
  } catch (err) {
    console.log("send error");
    console.log(err);
    return res.status(404).send("nepravelnyj id");
  }
};
