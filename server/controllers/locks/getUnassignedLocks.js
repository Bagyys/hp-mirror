const { Lock } = require("../../models/lockModel");

exports.getUnassignedLocks = async(req, res) => {
    const data = req.query;
    let locks;
    let message;

    if (!data.h || data.h !== "A3%nm*Wb") {
        return res.send({ locks: undefined, message: "no tag" });
    }

    try {
        locks = await Lock.find({ property: { $exists: false } }, { lockOpened: 0, lockClosed: 0, createdAt: 0, updatedAt: 0, __v: 0 });
        if (!locks) {
            return res.send({ locks: undefined, message: "no locks found" });

        }
        return res.send({ locks: locks, message: message });
    } catch (err) {
        return res.send({ locks: undefined, message: err.message });

    }
};