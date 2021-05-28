const moment = require('moment')

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
                [i]: true
            };
        } else {
            hour = {
                [i]: false
            };
        }
        hoursToSave = {...hoursToSave, ...hour };
    }
    return hoursToSave;
};

exports.formReservationHoursArray = (start, end) => {
    const startDateString = moment(start).format("YYYY-MM-DD")
    const startHourNumber = +moment(start).format("HH")
    const endDateString = moment(end).format("YYYY-MM-DD")
    const endHourNumber = +moment(end).format("HH")
    console.log("start")
    console.log(start)
    console.log("startDateString")
    console.log(startDateString)
    console.log("startHourNumber")
    console.log(startHourNumber)
    console.log("end")
    console.log(end)
    console.log("endDateString")
    console.log(endDateString)
    console.log("endHourNumber")
    console.log(endHourNumber)
    let datesArray = []
    if (startDateString === endDateString) {

    } else if (startDateString < endDateString) {
        // add one day to start date



        // datesArray.push({dateString: startDateString})


    }

}