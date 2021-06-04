const { Lock } = require("../../models/lockModel");
const { Property } = require("../../models/propertyModel");
// const { resetLock } = require("./utils/lock");
// let debug = require("debug");

exports.deleteLock = async(req, res) => {
    const data = req.query;
    let deletedLock;
    let updatedProperty;
    let locks;
    let message;
    if (!data.h || data.h !== "A3%nm*Wb") {
        return res.send({ locks: undefined, message: "no tag" });
    }
    if (data.id === undefined || data.id.length !== 24) {
        return res.send({ locks: undefined, message: "wrong id" });
    }
    try {
        deletedLock = await Lock.deleteOne({ _id: data.id });
    } catch (err) {
        return res.send({ locks: undefined, message: err.message });
    }

    try {
        updatedProperty = await Property.findOneAndUpdate({ lock: data.id }, { $unset: { lock: "" } });
        if (!updatedProperty) message = "property not updated"
    } catch (error) {
        return res.send({ locks: undefined, message: err.message });

    }

    if (deletedLock.deletedCount === 1) {
        try {
            locks = await Lock.find({}, { lockOpened: 0, lockClosed: 0, createdAt: 0, updatedAt: 0, __v: 0 });
            if (!locks) {
                return res.send({ locks: undefined, message: "no locks found" });
            }
        } catch (err) {
            return res.send({ locks: undefined, message: err.message });
        }
    } else {
        return res.send({ locks: undefined, message: "no doors find with this id" });
    }
    return res.send(locks);
};