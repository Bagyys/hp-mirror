const { User } = require("../../models/userModel");
const { Reservation } = require("../../models/reservationModel");
const { Property } = require("../../models/propertyModel");
const moment = require('moment')
const { formReservationHoursArray } = require("../../utils/reservation")


exports.cancelUserReservation = async(req, res) => {
    console.log("cancelUserReservation")
    const userId = req.params.userId;
    const { reservationId, propertyId } = req.body;
    console.log("reservationId")
    console.log(reservationId)
    let message;
    let reservations = [];
    if (userId === undefined || userId === null || userId.length !== 24) {
        message = "bad user identificator"
    }
    try {
        const user = await User.findById(userId);
        if (user) {
            const { activeReservations } = user;

            if (activeReservations.length > 0) {
                // console.log("activeReservations")
                // console.log(activeReservations)
                reservations = activeReservations.filter((resId) => resId.toString() !== reservationId.toString())
                try {
                    const reservationToBeDeleted = await Reservation.findById(reservationId);
                    console.log("reservationToBeDeleted")
                    console.log(reservationToBeDeleted)
                    const { startDate, endDate } = reservationToBeDeleted;

                    formReservationHoursArray(startDate, endDate)
                        // delete reservation
                        // const deletedReservation = await Reservation.deleteOne({ _id: reservationId });
                        // if (deletedReservation.deletedCount === 1) {
                        //     // update property's occupied time
                        //     try {
                        //         const property = await Property.findById(propertyId);
                        //         const propertyTimeArr = property.occupiedTime;
                        //         // loop through property's occupied time and remove the reserved time

                    //         // create and use util function to create the reservation time's array with hours 
                    //         // create an array of dates of the reservation time and loop through it


                    //         propertyTimeArr.map((occupiedDay) => {
                    //             console.log("occupiedDay")
                    //             console.log(occupiedDay)
                    //             const startDateString = moment(startDate).format("YYYY-MM-DD")
                    //             const endDateString = moment(endDate).format("YYYY-MM-DD")
                    //                 // const startHour = 
                    //             console.log("startDateString")
                    //             console.log(startDateString)
                    //             if (occupiedDay.dateString === startDateString) {
                    //                 // loop through day's hours and change them to false, if they are equal or greater than startDate hour
                    //             } else if (occupiedDay.dateString === endDateString) {
                    //                 // loop through day's hours and change them to false, if they are equal or less than endDate hour
                    //             }
                    //         })





                    //         //     occupiedTime.forEach((occupiedObj) => {
                    //         //         // find index of date string in property's occupiedTime array
                    //         //         const index = propertyTimeArr.findIndex((time) => {
                    //         //             return time.dateString === occupiedObj.date;
                    //         //         });
                    //         //         if (index >= 0) {
                    //         //             // if an index was found
                    //         //             hoursToSave = {};
                    //         //             // loop through hours object
                    //         //             let rentedHoursCounter = 0;
                    //         //             for (let i = 0; i < 24; i++) {
                    //         //                 let hour = {};
                    //         //                 if (
                    //         //                     // check if an hour was occupied in database
                    //         //                     property.occupiedTime[index].hours[i] === true ||
                    //         //                     occupiedObj.hours[i] === "unavailable" ||
                    //         //                     // or if user has selected that hour
                    //         //                     occupiedObj.hours[i] === "selected"
                    //         //                 ) {
                    //         //                     // assign occupied hour
                    //         //                     hour = {
                    //         //                         [i]: true
                    //         //                     };
                    //         //                     ++rentedHoursCounter;
                    //         //                 } else {
                    //         //                     // else assign available hour
                    //         //                     hour = {
                    //         //                         [i]: false
                    //         //                     };
                    //         //                 }
                    //         //                 hoursToSave = {...hoursToSave, ...hour };
                    //         //             }
                    //         //             let wholeDay = false;
                    //         //             if (rentedHoursCounter === 24) {
                    //         //                 wholeDay = true;
                    //         //             }
                    //         //             propertyTimeArr[index]["hours"] = Object.assign(
                    //         //                 propertyTimeArr[index]["hours"],
                    //         //                 hoursToSave
                    //         //             );
                    //         //             propertyTimeArr[index]["isWholeDayRented"] = wholeDay;
                    //         //         } else {
                    //         //             // if no index was found
                    //         //             const occupiedHours = {};
                    //         //             let rentedHoursCounter = 0;
                    //         //             // loop through user's selected day's hours
                    //         //             Object.entries(occupiedObj.hours).forEach(([hour, value]) => {
                    //         //                 // for (const [hour, value] of Object.entries(occupiedObj.hours)) {
                    //         //                 // console.log("hour + value");
                    //         //                 // console.log(hour + " " + value);
                    //         //                 // check if an hour was occupied in database
                    //         //                 // or if user has selected that hour
                    //         //                 if (value === "selected" || value === "unavailable") {
                    //         //                     // assign occupied hour
                    //         //                     occupiedHours[hour] = true;
                    //         //                     // and increase occupied hour counter
                    //         //                     ++rentedHoursCounter;
                    //         //                 } else {
                    //         //                     // assign available hour
                    //         //                     occupiedHours[hour] = false;
                    //         //                 }
                    //         //                 // console.log("occupiedHours[hour]");
                    //         //                 // console.log(occupiedHours[hour]);
                    //         //                 // console.log("rentedHoursCounter");
                    //         //                 // console.log(rentedHoursCounter);
                    //         //             });
                    //         //             // console.log("occupiedHours");
                    //         //             // console.log(occupiedHours);
                    //         //             // check if there are any occupied hours in the day
                    //         //             if (rentedHoursCounter) {
                    //         //                 const obj = {
                    //         //                     dateString: occupiedObj.date,
                    //         //                     isRented: true,
                    //         //                     isWholeDayRented: rentedHoursCounter === 24,
                    //         //                     hours: occupiedHours,
                    //         //                 };
                    //         //                 // console.log("obj");
                    //         //                 // console.log(obj);
                    //         //                 // push date object into occupied times array
                    //         //                 propertyTimeArr.push(obj);
                    //         //             }
                    //         //         }
                    //         //     });
                    //         //     updatedProperty = await Property.findByIdAndUpdate(
                    //         //         data.propertyId, { $set: { occupiedTime: propertyTimeArr } }, { new: true }
                    //         //     );
                    //     } catch (error) {
                    //         return res.status(400).json({
                    //             reservations: undefined,
                    //             message: error.message,
                    //         });
                    //     }



                    // }



                    // console.log("reservations")
                    // console.log(reservations)
                    // update user's activeReservations with reservations

                } catch (error) {
                    console.log("error.message")
                    console.log(error.message)
                    return res.status(400).json({
                        reservations: undefined,
                        message: error.message,
                    });
                }
            }
        } else {
            message = "such user doesn't exist"
        }

        return res.status(200).send({
            reservations,
            message
        });
    } catch (err) {
        console.log("err.message")
        console.log(err.message)
        return res.status(400).json({
            reservations: undefined,
            message: err.message,
        });
    }
};