const { Property } = require("../../models/propertyModel");

exports.getAllProperties = async(req, res) => {
    let properties;
    let message;
    try {
        properties = await Property.find();
        if (!properties || properties.length===0) {
            message = "no properties found"
        }
        return res.send({
            properties: properties,
            message: message
        });
    } catch (err) {
        return res.json({
            properties: undefined,
            message: err.message,
        });
    }
};
