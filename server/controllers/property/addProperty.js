const { Property } = require("../../models/propertyModel");

exports.addProperty = async (req, res) => {
  const data = req.body;
  const propertyObject = { ...data };
  const createdProperty = new Property(propertyObject);
  try {
    await createdProperty.save();
    return res.status(200).send(createdProperty);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
