const { Property } = require("../../models/propertyModel");

exports.getPropertieswoLocks = async (req, res) => {
  try {
    const properties = await Property.find({ lock: { $exists: false } });
    return res.status(200).send(properties);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
