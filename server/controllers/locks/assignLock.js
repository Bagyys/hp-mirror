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
    if (lockId && propertyId) {
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
      if (lock && property) {
        return res.status(200).send("ok");
      } else {
        return res.status(400).send("error");
      }
    } else {
      return res.status(400).send("error");
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
