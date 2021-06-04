const { Reservation } = require("../../models/reservationModel");
const { User } = require("../../models/userModel");
const { Property } = require("../../models/propertyModel");

exports.addReservation = async(req, res) => {
    const data = req.body;
    const { occupiedTime, ...reservationObject } = data;
    let message;
    let savedReservation;
    let updatedProperty;
    let propertyTimeArr;
    try {
        const createdReservation = new Reservation(reservationObject);
        savedReservation = await createdReservation.save();
        try {
            const updatedUser = await User.findByIdAndUpdate(
                data.userId, {
                    $addToSet: { activeReservations: createdReservation._id },
                }, { new: true }
            );
            if (!updatedUser) { message = "User wasn't updated" }
        } catch (error) {
            return res.json({
                reservation: undefined,
                message: error.message,
            });
        }

        try {
            const property = await Property.findById(data.propertyId);
            if (property) {
                propertyTimeArr = property.occupiedTime;
                // loop through user's selected days
                occupiedTime.forEach((occupiedObj) => {
                    // find index of date string in property's occupiedTime array
                    const index = propertyTimeArr.findIndex((time) => {
                        return time.dateString === occupiedObj.date;
                    });
                    if (index >= 0) {
                        // if an index was found
                        hoursToSave = {};
                        // loop through hours object
                        let rentedHoursCounter = 0;
                        for (let i = 0; i < 24; i++) {
                            let hour = {};
                            if (
                                // check if an hour was occupied in database
                                property.occupiedTime[index].hours[i] === true ||
                                occupiedObj.hours[i] === "unavailable" ||
                                // or if user has selected that hour
                                occupiedObj.hours[i] === "selected"
                            ) {
                                // assign occupied hour
                                hour = {
                                    [i]: true
                                };
                                ++rentedHoursCounter;
                            } else {
                                // else assign available hour
                                hour = {
                                    [i]: false
                                };
                            }
                            hoursToSave = {...hoursToSave, ...hour };
                        }
                        let wholeDay = false;
                        if (rentedHoursCounter === 24) {
                            wholeDay = true;
                        }
                        propertyTimeArr[index]["hours"] = Object.assign(
                            propertyTimeArr[index]["hours"],
                            hoursToSave
                        );
                        propertyTimeArr[index]["isWholeDayRented"] = wholeDay;
                    } else {
                        // if no index was found
                        const occupiedHours = {};
                        let rentedHoursCounter = 0;
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
                });
            } else {
                message = "No property was found"
            }

            try {
                updatedProperty = await Property.findByIdAndUpdate(
                    data.propertyId, { $set: { occupiedTime: propertyTimeArr } }, { new: true }
                );
                if (!updatedProperty) {
                    message = "Pproperty wasn't updated"

                }
            } catch (error) {
                return res.json({
                    reservation: undefined,
                    message: error.message,
                });
            }

        } catch (error) {
            return ResizeObserverSize.json({
                reservation: undefined,
                message: error.message,
            });
        }
        return res.send({
            reservation: savedReservation,
            message: message
        });
    } catch (err) {
        return res.json({
            reservation: undefined,
            message: err.message,
        });
    }
};