const { Lock } = require("../../models/lockModel");
const { Property } = require("../../models/propertyModel");

exports.getAllLocks = async(req, res) => {
    const { h } = req.query;

    let locksWithProperty;
    let message;

    if (!h || h !== "A3%nm*Wb") {
        return res.json({
            locks: undefined,
            message: "no tag",
        });
    }

    try {
        const locks = await Lock.find({}, { lockOpened: 0, lockClosed: 0, createdAt: 0, updatedAt: 0, __v: 0 });
        if (locks !== undefined || locks !== null) {
            locksWithProperty = await Promise.all(
                locks.map(async(lock) => {
                    try {
                        const property = await Property.findById(lock.property, {
                            title: 1,
                            location: 1,
                        });
                        const fullLock = {...lock._doc };
                        fullLock.propertyFull = property;
                        return fullLock;
                    } catch (error) {
                        return res.json({
                            locks: undefined,
                            message: error.message,
                        });
                    }
                })
            );

            return res.status(200).send({ locks: locksWithProperty, message });
        } else {
            message = "no locks found";
        }
    } catch (error) {
        return res.json({
            locks: undefined,
            message: error.message,
        });
    }
};