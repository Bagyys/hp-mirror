const { Reservation } = require("../../models/reservationModel");
const { User } = require("../../models/userModel");
const { Property } = require("../../models/propertyModel");

exports.addReservation = async (req, res) => {
  const data = req.body;
  const { occupiedTime, ...reservationObject } = data;
  console.log("reservationObject");
  console.log(reservationObject);
  console.log("occupiedTime");
  console.log(occupiedTime);
  try {
    const createdReservation = new Reservation(reservationObject);
    console.log("createdReservation");
    console.log(createdReservation);
    // all good
    await createdReservation.save();
    try {
      console.log("createdReservation._id");
      console.log(createdReservation._id);
      const updatedUser = await User.findByIdAndUpdate(
        data.userId,
        {
          $addToSet: { activeReservations: createdReservation._id },
        },
        { new: true }
      );
      console.log("updatedUser");
      console.log(updatedUser);
    } catch (error) {
      console.log("e1" + err.message);
      return res.status(500).json({ error: err.message });
    }

    // patikrinti, ar yra masyve jau tokia data
    // jei yra - pereiti visas valandas ir priskirti atitinkamas reiksmes
    // jei nera - prideti nauja objekta tai datai

    // let occupiedHours = {};
    // for (let i = 0; i < 24; i++) {
    //   let hour = {};
    //   rentedHours[i]
    //     ? (hour = { [i]: "unavailable" })
    //     : (hour = { [i]: "available" });
    //   occupiedHours = { ...occupiedHours, ...hour };
    // }
    const updateOccTimeArray = occupiedTime.map((occupiedObj) => {
      const rentedHours = [];
      for (const [hour, value] of Object.entries(occupiedObj.hours)) {
        if (value === "selected" || value === "unavailable") {
          rentedHours.push({
            hourNumber: hour,
            isWholeHourRented: true,
            minutes: {
              0: true,
              1: true,
              2: true,
              3: true,
              4: true,
              5: true,
              6: true,
              7: true,
              8: true,
              9: true,
              10: true,
              11: true,
              12: true,
              13: true,
              14: true,
              15: true,
              16: true,
              17: true,
              18: true,
              19: true,
              20: true,
              21: true,
              22: true,
              23: true,
              24: true,
              25: true,
              26: true,
              27: true,
              28: true,
              29: true,
              30: true,
              31: true,
              32: true,
              33: true,
              34: true,
              35: true,
              36: true,
              37: true,
              38: true,
              39: true,
              40: true,
              41: true,
              42: true,
              43: true,
              44: true,
              45: true,
              46: true,
              47: true,
              48: true,
              49: true,
              50: true,
              51: true,
              52: true,
              53: true,
              54: true,
              55: true,
              56: true,
              57: true,
              58: true,
              59: true,
            },
          });
        }
      }
      return {
        // reservationId: createdReservation._id,
        dateString: occupiedObj.date,
        isRented: true,
        isWholeDayRented: rentedHours.length === 24,
        rentedHours,
      };
    });
    // console.log("updateOccTimeArray");
    // console.log(updateOccTimeArray);

    try {
      const updatedProperty = await Property.findByIdAndUpdate(
        data.propertyId,
        {
          $addToSet: { occupiedTime: { $each: updateOccTimeArray } },
        },
        { new: true }
      );

      console.log("updatedProperty");
      console.log(updatedProperty);
    } catch (error) {
      console.log("e2" + err.message);
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).send(createdReservation);
  } catch (err) {
    console.log("e3 " + err.message);

    return res.status(500).json({ error: err.message });
  }
};
