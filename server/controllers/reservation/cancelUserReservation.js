const moment = require("moment");
const { ObjectId } = require("mongodb");

const { User } = require("../../models/userModel");
const { Reservation } = require("../../models/reservationModel");
const { Property } = require("../../models/propertyModel");
const { formReservationHoursArray } = require("../../utils/reservation");

exports.cancelUserReservation = async (req, res) => {
  // TODO: cancel only if there's atleast X time left until the start of reservation

  const userId = req.params.userId;
  const { reservationId, propertyId } = req.body;
  let message;
  let reservations = [];
  let property;
  let reservationToBeDeleted;
  let reservationOccupiedDays;
  let propertyTimeArr;
  if (userId === undefined || userId === null || userId.length !== 24) {
    message = "bad user identificator";
  }
  try {
    const user = await User.findById(userId);
    if (user) {
      const { activeReservations } = user;

      if (activeReservations.length > 0) {
        reservations = activeReservations.filter(
          (resId) => resId.toString() !== reservationId.toString()
        );
        try {
          reservationToBeDeleted = await Reservation.findById(reservationId);
        } catch (error) {
          return res.status(400).json({
            // reservations: undefined,
            message: "Find reservation error: " + error.message,
          });
        }
        if (reservationToBeDeleted) {
          const { startDate, endDate } = reservationToBeDeleted;

          reservationOccupiedDays = formReservationHoursArray(
            startDate,
            endDate
          );
        }

        try {
          property = await Property.findById(propertyId);
          if (property) {
            propertyTimeArr = property.occupiedTime;
          }
        } catch (error) {
          return res.status(400).json({
            // reservations: undefined,
            message: "Find property error: " + error.message,
          });
        }

        reservationOccupiedDays.map((occupiedDay) => {
          const index = propertyTimeArr.findIndex((item) => {
            return (
              item.isRented &&
              moment(occupiedDay.dateString).format("YYYY-MM-DD") ===
                moment(item.dateString).format("YYYY-MM-DD")
            );
          });

          if (index >= 0) {
            let hourCount = 0;
            for (let [key, value] of Object.entries(
              propertyTimeArr[index].hours
            )) {
              if (key in occupiedDay.hours) {
                propertyTimeArr[index].hours[key] = !occupiedDay.hours[key];
              }
              if (!propertyTimeArr[index].hours[key]) ++hourCount;
            }
            if (hourCount === 24) {
              propertyTimeArr.splice(index, 1);
            } else if (hourCount === 0) {
              propertyTimeArr[index].isWholeDayRented = true;
            } else {
              propertyTimeArr[index].isWholeDayRented = false;
            }
          }
        });

        // delete the reservation from DB
        try {
          await reservationToBeDeleted.remove();
        } catch (error) {
          return res.status(400).json({
            // reservations: undefined,
            message: "Delete reservation error: " + error.message,
          });
        }
        // update property
        try {
          await property.updateOne({ $set: { occupiedTime: propertyTimeArr } });
        } catch (error) {
          return res.status(400).json({
            // reservations: undefined,
            message: "Update property error: " + error.message,
          });
        }
        // update user
        try {
          await user.updateOne({
            $pull: { activeReservations: new ObjectId(reservationId) },
          });
        } catch (error) {
          return res.status(400).json({
            // reservations: undefined,
            message: "Update user error: " + error.message,
          });
        }
      }
    } else {
      message = "such user doesn't exist";
    }

    return res.send({
    //   reservations,
      message,
    });
  } catch (err) {
    return res.status(400).json({
    //   reservations: undefined,
      message: "Find user error: " + err.message,
    });
  }
};
