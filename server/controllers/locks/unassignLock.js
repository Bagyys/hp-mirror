const { Lock } = require("../../models/lockModel");
const { Property } = require("../../models/propertyModel");

exports.unassignLock = async(req, res) => {
    const { lockId } = req.body;
    let message;
    let locks = [];
    let properties = [];
    let property;
    let updatedLock;
    let updatedProperty;
    try {
        if (lockId) {
            lock = await Lock.findOne({
                _id: lockId,
                property: { $exists: true },
            });

            if (lock) {
                try {
                    property = await Property.findOne({
                        _id: lock.property,
                        lock: { $exists: true },
                    });
                } catch (error) {
                    return res
                        .send({ locks: undefined, properties: undefined, message: error.message });
                }
                if (property) {
                    try {
                        updatedLock = await Lock.findByIdAndUpdate(
                            lockId, {
                                $unset: { property: "" },
                            }, { new: true }
                        );
                    } catch (error) {
                        return res
                            .send({ locks: undefined, properties: undefined, message: error.message });
                    }
                    try {
                        updatedProperty = await Property.findByIdAndUpdate(
                            lock.property, {
                                $unset: { lock: "" },
                            }, { new: true }
                        );
                    } catch (error) {
                        return res
                            .send({ locks: undefined, properties: undefined, message: error.message });
                    }
                    if (updatedLock && updatedProperty) {
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
                        try {
                            properties = await Property.find();
                        } catch (error) {
                            return res
                                .send({ locks: undefined, properties: undefined, message: error.message });
                        }
                    } else {
                        message = "lock / property update failed";
                    }
                } else {
                    message = "no property found";
                }
            } else {
                message = "no lock found";
            }
        } else {
            message = "no lock id";
        }
        return res.send({ locks, properties, message });
    } catch (err) {
        return res.send({ locks: undefined, properties: undefined, message: err.message });
    }
};