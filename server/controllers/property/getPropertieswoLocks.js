const { Property } = require("../../models/propertyModel");
// TODO: currently not used. Check later if it will become usefull. If not, delete
exports.getPropertieswoLocks = async(req, res) => {
    try {
        const properties = await Property.find({ lock: { $exists: false } });
        return res.status(200).send(properties);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};