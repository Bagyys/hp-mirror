const { Flat } = require("../models/flatModel");

exports.getFlat = async (req, res) => {
  const data = req.query;
  const doorID = req.query.id;

  try {
 

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
