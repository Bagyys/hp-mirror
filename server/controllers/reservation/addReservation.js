const { Reservation } = require("../../models/reservationModel");
const { User } = require("../../models/userModel");
const { Property } = require("../../models/propertyModel");

exports.addReservation = async (req, res) => {
  const data = req.body;
  const { occupiedTime, ...reservationObject } = data;
  // console.log("reservationObject");
  // console.log(reservationObject);
  console.log("occupiedTime");
  console.log(occupiedTime);
  try {
    const createdReservation = new Reservation(reservationObject);
    // console.log("createdReservation");
    // console.log(createdReservation);
    // all good
    await createdReservation.save();
    try {
      const updatedUser = await User.findByIdAndUpdate(
        data.userId,
        {
          $addToSet: { activeReservations: createdReservation._id },
        },
        { new: true }
      );
      // console.log("updatedUser");
      // console.log(updatedUser);
    } catch (error) {
      console.log("e1" + err.message);
      return res.status(500).json({ error: err.message });
    }

    try {
      const property = await Property.findById(data.propertyId);
      // console.log("property");
      // console.log(property);
      const propertyTimeArr = property.occupiedTime;
      // console.log("propertyTimeArr");
      // console.log(propertyTimeArr);
      // const updateOccTimeArray = [];
      // loop through user's selected days
      occupiedTime.forEach((occupiedObj) => {
        // find index of date string in property's occupiedTime array
        const index = propertyTimeArr.findIndex((time) => {
          return time.dateString === occupiedObj.date;
        });
        console.log("index");
        console.log(index);
        if (index >= 0) {
          console.log("property.occupiedTime[index].hours");
          console.log(property.occupiedTime[index].hours);
          console.log("occupiedObj.hours");
          console.log(occupiedObj.hours);
          // if an index was found
          hoursToSave = {};
          // loop through hours object
          for (let i = 0; i < 24; i++) {
            let hour = {};
            let rentedHoursCounter = 0;
            if (
              // check if an hour was occupied in database
              property.occupiedTime[index].hours[i] === true ||
              occupiedObj.hours[i] === "unavailable" ||
              // or if user has selected that hour
              occupiedObj.hours[i] === "selected"
            ) {
              // assign occupied hour
              hour = { [i]: true };
              ++rentedHoursCounter;
            } else {
              // else assign available hour
              hour = { [i]: false };
            }
            hoursToSave = { ...hoursToSave, ...hour };
          }
          console.log("hoursToSave");
          console.log(hoursToSave);
          console.log("propertyTimeArr[index]");
          console.log(propertyTimeArr[index]);
          const daf = Object.assign(propertyTimeArr[index].hours, hoursToSave);
          console.log("daf");
          console.log(daf);
          // propertyTimeArr[index].hours = hoursToSave;
          let wholeDay = false;
          rentedHoursCounter === 24 ? (wholeDay = true) : (wholeDay = false);
          console.log("wholeDay");
          console.log(wholeDay);
          propertyTimeArr[index]["hours"] = Object.assign(
            propertyTimeArr[index]["hours"],
            hoursToSave
          );
          propertyTimeArr[index]["isWholeDayRented"] = wholeDay;
          console.log("propertyTimeArr[index] after updates");
          console.log(propertyTimeArr[index]);
        } else {
          // if no index was found
          // console.log(false);
          const occupiedHours = {};
          let rentedHoursCounter = 0;
          // console.log("occupiedObj.hours");
          // console.log(occupiedObj.hours);
          // loop through user's selected day's hours
          Object.entries(occupiedObj.hours).forEach(([hour, value]) => {
            // for (const [hour, value] of Object.entries(occupiedObj.hours)) {
            // console.log("hour + value");
            // console.log(hour + " " + value);
            // check if an hour was occupied in database
            // or if user has selected that hour
            if (value === "selected" || value === "unavailable") {
              // assign occupied hour
              occupiedHours[hour] = true;
              // and increase occupied hour counter
              ++rentedHoursCounter;
            } else {
              // assign available hour
              occupiedHours[hour] = false;
            }
            // console.log("occupiedHours[hour]");
            // console.log(occupiedHours[hour]);
            // console.log("rentedHoursCounter");
            // console.log(rentedHoursCounter);
          });
          // console.log("occupiedHours");
          // console.log(occupiedHours);
          // check if there are any occupied hours in the day
          if (rentedHoursCounter) {
            const obj = {
              dateString: occupiedObj.date,
              isRented: true,
              isWholeDayRented: rentedHoursCounter === 24,
              hours: occupiedHours,
            };
            // console.log("obj");
            // console.log(obj);
            // push date object into occupied times array
            propertyTimeArr.push(obj);
          }
        }
        // for (const [hour, value] of Object.entries(occupiedObj.hours)) {
        //   if (value === "selected" || value === "unavailable") {
        //   }
        // }
        console.log("propertyTimeArr");
        console.log(propertyTimeArr);
      });
      const updatedProperty = await property.updateOne(
        { $set: { occupiedTime: propertyTimeArr } },
        { new: true }
      );
      console.log("updatedProperty");
      console.log(updatedProperty);
    } catch (error) {}

    //   console.log("updatedProperty");
    //   console.log(updatedProperty);
    // } catch (error) {
    //   console.log("e2" + err.message);
    //   return res.status(500).json({ error: err.message });
    // }
    return res.status(200).send(createdReservation);
  } catch (err) {
    console.log("e3 " + err.message);

    return res.status(500).json({ error: err.message });
  }
};
