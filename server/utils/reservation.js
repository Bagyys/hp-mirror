const moment = require("moment-timezone");

const { Lock } = require("../models/lockModel");
const { Property } = require("../models/propertyModel");
const { Reservation } = require("../models/reservationModel");

exports.compareHourObjects = (dbHours, inputHours) => {
  hoursToSave = {};
  for (let i = 0; i < 24; i++) {
    let hour = {};
    if (
      dbHours[i] === true ||
      inputHours[i] === "unavailable" ||
      inputHours[i] === "selected"
    ) {
      hour = {
        [i]: true,
      };
    } else {
      hour = {
        [i]: false,
      };
    }
    hoursToSave = { ...hoursToSave, ...hour };
  }
  return hoursToSave;
};

const getHoursAfter = (hour, occupied) => {
  const hours = {};
  for (let i = hour; i < 24; i++) {
    hours[i] = occupied;
  }
  return hours;
};

const getHoursBefore = (hour, occupied) => {
  const hours = {};
  for (let i = 0; i <= hour; i++) {
    hours[i] = occupied;
  }
  return hours;
};

const getHoursBetween = (start, end, occupied) => {
  const hours = {};
  for (let i = start; i <= end; i++) {
    hours[i] = occupied;
  }
  return hours;
};

exports.formReservationHoursArray = (start, end, timezone) => {
  const startDateString = moment.tz(start, timezone).format("YYYY-MM-DD");
  const startHourNumber = +moment.tz(start, timezone).format("HH");
  const endDateString = moment.tz(end, timezone).format("YYYY-MM-DD");
  const endHourNumber = +moment.tz(end, timezone).format("HH");
  let datesArray = [];
  if (startDateString === endDateString) {
    const occupiedHours = getHoursBetween(startHourNumber, endHourNumber, true);
    datesArray.push({ dateString: startDateString, hours: occupiedHours });
  } else if (startDateString < endDateString) {
    const startDayHours = getHoursAfter(startHourNumber, true);
    datesArray.push({ dateString: startDateString, hours: startDayHours });

    const endDayHours = getHoursBefore(endHourNumber, true);
    datesArray.push({ dateString: endDateString, hours: endDayHours });

    const startMoment = moment(start).startOf("day");
    const endMoment = moment(end).startOf("day");
    const difference = endMoment.diff(startMoment, "days");
    for (let i = 1; i < difference; i++) {
      const betweenDate = moment(start)
        .add(i + 1, "day")
        .startOf("day");
      const betweenDateString = moment(betweenDate).format("YYYY-MM-DD");
      const occupiedHours = getHoursBetween(0, 23, true);
      datesArray.push({
        dateString: betweenDateString,
        hours: occupiedHours,
      });
    }
  }
  return datesArray;
};

exports.checkActiveReservations = async (lockId) => {
  console.log("checkActiveReservations");
  let message;
  let lock;
  let active = 0;
  let property;
  let reservation;
  try {
    lock = await Lock.findById(lockId);
  } catch (error) {
    message = error.message;
  }
  console.log("lock");
  console.log(lock);
  if (!lock) return active;
  const { property: propertyId } = lock;

  try {
    property = await Property.findById(propertyId);
  } catch (error) {
    return active;
  }
  // console.log("property");
  // console.log(property);
  if (!property) return active;
  const { timeZone } = property.location;
  const now = moment.utc().tz(timeZone);
  // console.log("now");
  // console.log(now);
  const nowDate = now.toDate();
  // console.log("nowDate");
  // console.log(nowDate);
  const nowDateString = now.format("YYYY-MM-DD");
  const nowHourNumber = +now.format("HH");
  // console.log("nowDateString");
  // console.log(nowDateString);
  // console.log("nowHourNumber");
  // console.log(nowHourNumber);
  const index = property.occupiedTime.findIndex((item) => {
    return (
      item.isRented &&
      nowDateString === moment(item.dateString).format("YYYY-MM-DD")
    );
  });
  // console.log("index");
  // console.log(index);
  // console.log("property.occupiedTime[index].hours[nowHourNumber]");
  // console.log(property.occupiedTime[index].hours[nowHourNumber]);
  // does property's occupied time array contain current time + timezone?
  // Y: find reservation and double check
  if (index >= 0 && property.occupiedTime[index].hours[nowHourNumber]) {
    console.log(true);
    try {
      // find by property id and current date - must be between start and end dates + timezone
      reservations = await Reservation.find({
        propertyId: property._id,
        startDate: { $lte: nowDate },
        endDate: { $gte: nowDate },
      });
      console.log("reservations");
      console.log(reservations);
      if (reservations && reservations.length === 1) {
        reservation = reservations[0];
        active = 1;
        await lock.updateOne({ a: 1 });
      } else {
        // smth
        return active;
      }
    } catch (error) {
      return active;
    }
  }
  // N: return active = 0
  // console.log("active");
  // console.log(active);
  return active;
};
