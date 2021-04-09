const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lockSchema = new Schema({
    // lock id
    // lockId: { type: String, required: false },

    // interval for lock
    timeInterval: { type: Number, default: 1 },
    // parameters
    i1: { type: Number, default: 0 },
    i2: { type: Number, default: 0 },
    i3: { type: Number, default: 0 },
    i4: { type: Number, default: 0 },
    i5: { type: Number, default: 0 },
    i6: { type: Number, default: 0 },
    i7: { type: Number, default: 0 },
    i8: { type: Number, default: 0 },
    i9: { type: Number, default: 0 },
    // states
    o1: { type: Number, default: 0 },
    o2: { type: Number, default: 0 },
    o3: { type: Number, default: 0 },
    // error
    // do we need to save error?
    e: { type: String, default: "0" },
    lockOpened: new Schema({
        o1: [
            new Schema({
                time: { type: Date },
                user: { type: Schema.Types.ObjectId, ref: "User" }, // if closed by system - what user??? maybe create a system user? 
            }, { _id: false }),
        ],
        o2: [
            new Schema({
                time: { type: Date },
                user: { type: Schema.Types.ObjectId, ref: "User" }, // if closed by system - what user???
            }, { _id: false }),
        ],
    }, { _id: false }),
    lockClosed: new Schema({
        o1: [
            new Schema({
                time: { type: Date },
                // user: { type: Schema.Types.ObjectId, ref: "User" }, // if closed by system - what user???
                user: { type: String }, // if closed by system - what user???
            }, { _id: false }),
        ],
        o2: [
            new Schema({
                time: { type: Date },
                // user: { type: Schema.Types.ObjectId, ref: "User" }, // if closed by system - what user???
                user: { type: String }, // if closed by system - what user???
            }, { _id: false }),
        ],
    }, { _id: false }),
}, { timestamps: true });

module.exports = {
    Lock: mongoose.model("Lock", lockSchema),
    lockSchema: lockSchema,
};