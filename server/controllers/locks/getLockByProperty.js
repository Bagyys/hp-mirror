const { Lock } = require("../../models/lockModel");

exports.getLockByProperty = async(req, res) => {
    const id = req.params.id;
    let lock;
    let message;
    if (!id) message = "no property id"
    try {
        lock = await Lock.findOne({ property: id }, { lockOpened: 0, lockClosed: 0, createdAt: 0, updatedAt: 0, __v: 0 });
        if (!lock) {
            message = "no lock found";
        }
        return res.status(200).send({ lock: lock, message: message });
    } catch (err) {
        return res.json({ lock: undefined, message: err.message });
    }
};