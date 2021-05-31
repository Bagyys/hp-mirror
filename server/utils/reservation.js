const moment = require("moment-timezone");

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

exports.formReservationHoursArray = (start, end) => {
  const startDateString = moment(start).format("YYYY-MM-DD");
  const startHourNumber = +moment(start).format("HH");
  const endDateString = moment(end).format("YYYY-MM-DD");
  const endHourNumber = +moment(end).format("HH");
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
    return datesArray;
  }
};
