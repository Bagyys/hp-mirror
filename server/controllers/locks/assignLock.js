const { Lock } = require("../../models/lockModel");
const { Property } = require("../../models/propertyModel");

exports.assignLock = async(req, res) => {
    const { propertyId, lockId } = req.body;
    let message;
    let lock;
    let property;
    let locks = [];
    let properties = [];

    try {
        if (lockId && propertyId) {
            lock = await Lock.findByIdAndUpdate(
                lockId, { property: propertyId }, { new: true }
            );

            try {
                property = await Property.findByIdAndUpdate(
                    propertyId, { lock: lockId }, { new: true }
                );
            } catch (error) {
                return res
                    .send({ locks: undefined, properties: undefined, message: error.message });
            }

            if (lock && property) {
                try {
                    properties = await Property.find();
                } catch (error) {
                    return res
                        .send({ locks: undefined, properties: undefined, message: error.message });
                }

                try {
                    locks = await Lock.find({ property: { $exists: false } }, {
                        lockOpened: 0,
                        lockClosed: 0,
                        createdAt: 0,
                        updatedAt: 0,
                        __v: 0,
                    });
                } catch (error) {
                    return res
                        .send({ locks: undefined, properties: undefined, message: error.message });
                }
            } else {
                message = "no lock / property found";
            }
        } else {
            message = "no lock / property id";
        }
        return res.send({ locks, properties, message });
    } catch (err) {
        return res.send({ locks: undefined, properties: undefined, message: err.message });
    }
};