const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    // user id
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // property id
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    // number of residents
    residents: { type: Number, required: true },
    // total reservation price
    price: { type: Number, required: true },
    // reservation start time
    startDate: { type: Date, required: true },
    // reservation end time
    endDate: { type: Date, required: true },
    // property time zone in TZ database name
    timeZone: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = {
  Reservation: mongoose.model("Reservation", reservationSchema),
  reservationSchema: reservationSchema,
};
