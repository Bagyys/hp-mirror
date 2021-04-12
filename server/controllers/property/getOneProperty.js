const { Property } = require("../../models/propertyModel");

exports.getOneProperty = async (req, res) => {
  const id = req.params.id;
  try {
    const property = await Property.findById(id);
    return res.status(200).send(property);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
