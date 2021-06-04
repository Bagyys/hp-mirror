const { Property } = require("../../models/propertyModel");

exports.getOneProperty = async(req, res) => {
    const id = req.params.id;
    let property;
    let message;
    try {
        property = await Property.findById(id);
        if (!property) message = "property wasn't found"
        return res.send({ property: proeprty, message: message });
    } catch (err) {
        return res.send({ property: undefined, message: err.message });

    }
};