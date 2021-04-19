import { Action, Dispatch } from "redux";
import moment from "moment-timezone";
import axios, { AxiosResponse } from "axios";
// import Swal from "sweetalert2";

import { OccupiedDay, OccupiedHour } from "../reducers/propertyReducer";
import { SelectionAvailabilty } from "../reducers/bookingReducer";
import bookingTypes from "../types/bookingTypes";

// -------------------- URLS --------------------
// development URL
const url = process.env.REACT_APP_DEV_URL;

// production URL
// const url = process.env.REACT_APP_PROD_URL;
// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------

export interface CheckAvailability
  extends Action<typeof bookingTypes.CHECK_SELECTED_DAYS> {
  payload: {
    displayDays: Array<SelectionAvailabilty>;
    selectedDays: Array<Date>;
  };
}

export interface SelectHour
  extends Action<typeof bookingTypes.HANDLE_SELECTED_HOUR> {
  payload: {
    startTime: Date;
    endTime: Date;
    displayDays: Array<SelectionAvailabilty>;
  };
}

export interface BookTimeStart
  extends Action<typeof bookingTypes.BOOK_TIME_START> {}

export interface BookTimeSuccess
  extends Action<typeof bookingTypes.BOOK_TIME_SUCCESS> {
  payload: any;
}

export interface BookTimeFail
  extends Action<typeof bookingTypes.BOOK_TIME_FAIL> {
  payload: string;
}

export type Actions =
  | CheckAvailability
  | SelectHour
  | BookTimeStart
  | BookTimeSuccess
  | BookTimeFail;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- HELPERS --------------------

const indexInArray = (array: Array<any>, value: Date): number => {
  // TODO add typescript interface for array
  return array.findIndex((item) => {
    return (
      item.isRented &&
      moment(value).format("YYYY-MM-DD") ===
        moment(item.date).format("YYYY-MM-DD")
      // moment(moment(item.date).startOf("day").toDate()).isSame(value)
      // new Date(item.date).getFullYear() === value.getFullYear() &&
      // new Date(item.date).getMonth() === value.getMonth() &&
      // new Date(item.date).getDate() === value.getDate()
    );
    // return item.isRented && new Date(item.date).getTime() === value.getTime();
  });
};

const indexInDisplayArray = (
  array: Array<SelectionAvailabilty>,
  value: string
): number => {
  return array.findIndex((item) => {
    return item.date === value;
  });
};

const formAvailableDayHours = () => {
  let availableHours = {};
  for (let i = 0; i < 24; i++) {
    const hour = { [i]: "available" };
    availableHours = { ...availableHours, ...hour };
  }
  return availableHours;
};

const formOccupiedDayHours = (rentedHours: Array<OccupiedHour>) => {
  let occupiedHours = {};
  for (let i = 0; i < 24; i++) {
    const occIndex = rentedHours.findIndex((rentedHour) => {
      return rentedHour.hourNumber === i;
    });
    let hour = {};
    occIndex < 0
      ? (hour = { [i]: "available" })
      : (hour = { [i]: "unavailable" });
    occupiedHours = { ...occupiedHours, ...hour };
  }
  return occupiedHours;
};

const unselectDayHours = (hours: { [key: number]: string }) => {
  Object.entries(hours).forEach(([key, value]) => {
    if (value === "selected") {
      hours[+key] = "available";
    }
  });
  return hours;
};
// -------------------- END of HELPERS --------------------

// -------------------- ACTIONS --------------------

export const checkAvailabilityAction = (
  selectedDays: Array<Date>,
  occupiedTime: Array<OccupiedDay>
) => async (dispatch: Dispatch) => {
  // console.log("checkAvailabilityAction");
  // console.log("selectedDays");
  // console.log(selectedDays);
  // console.log("occupiedTime");
  // console.log(occupiedTime);
  const displayDays = selectedDays.map((selectedDay: Date) => {
    // console.log("inside selected days map");
    // console.log("selectedDay");
    // console.log(selectedDay);
    const occIndex = indexInArray(occupiedTime, selectedDay);
    // console.log("occIndex");
    // console.log(occIndex);
    // const hours = formAvailableDayHours();
    let displayDay;
    if (occIndex < 0) {
      displayDay = {
        date: moment(selectedDay).format("YYYY-MM-DD"),
        isRented: false,
        hours: formAvailableDayHours(),
      };
    } else {
      displayDay = {
        date: moment(selectedDay).format("YYYY-MM-DD"),
        isRented: true,
        hours: formOccupiedDayHours(occupiedTime[occIndex].rentedHours),
      };
    }
    return displayDay;
  });
  // console.log("displayDays");
  // console.log(displayDays);
  dispatch({
    type: bookingTypes.CHECK_SELECTED_DAYS,
    payload: {
      displayDays,
      selectedDays,
    },
  });
};

export const selectHourAction = (
  date: {
    hour: number;
    day: string;
    dayIndex: number;
    timeZone: string;
  },
  startTime: Date | undefined,
  endTime: Date | undefined,
  displayDays: Array<SelectionAvailabilty>
) => async (dispatch: Dispatch) => {
  const newDateString =
    date.hour < 10
      ? `${date.day} 0${date.hour}:00`
      : `${date.day} ${date.hour}:00`;
  const newDateMoment = moment.tz(newDateString, date.timeZone);

  if (startTime === undefined) {
    // if startTime is undefined -> assign the selected time to it
    const dayIndex = indexInDisplayArray(displayDays, date.day);
    startTime = newDateMoment.toDate();
    //    - and assign "selected" in displayDays
    displayDays[dayIndex].hours[date.hour] = "selected";
  } else if (startTime !== undefined && endTime !== undefined) {
    // if startTime and endTime are both defined -> reset startTime to the new selected time, endTime to undefined
    const dayIndex = indexInDisplayArray(displayDays, date.day);
    startTime = newDateMoment.toDate();
    endTime = undefined;
    //    - and assign "selected" in displayDays and reset previousle selected hours
    displayDays.map((oneDay, index) => {
      if (dayIndex === index) {
        oneDay.hours = unselectDayHours(oneDay.hours);
        oneDay.hours[date.hour] = "selected";
      } else {
        oneDay.hours = unselectDayHours(oneDay.hours);
      }
      return oneDay;
    });
  } else {
    // if startTime is not undefined and endTime is undefined ->
    // check if the selected time is before startTime
    if (moment(moment.utc(startTime)).isBefore(moment.utc(newDateMoment))) {
      // if startTime is before the selected time
      endTime = newDateMoment.toDate();
      const startTimeIndex = indexInDisplayArray(
        displayDays,
        moment(startTime).format("YYYY-MM-DD")
      );
      const endTimeIndex = indexInDisplayArray(
        displayDays,
        moment(endTime).format("YYYY-MM-DD")
      );
      const startTimeHour = moment.tz(startTime, date.timeZone).hours();
      const endTimeHour = moment.tz(endTime, date.timeZone).hours();
      // and assign "selected" in displayDays
      displayDays.map((oneDay, index) => {
        if (index === startTimeIndex && index === endTimeIndex) {
          for (let j = startTimeHour; j <= date.hour; j++) {
            oneDay.hours[j] = "selected";
          }
        } else if (index === startTimeIndex) {
          for (let j = startTimeHour; j <= 23; j++) {
            oneDay.hours[j] = "selected";
          }
        } else if (index === endTimeIndex) {
          for (let j = 0; j <= endTimeHour; j++) {
            oneDay.hours[j] = "selected";
          }
        } else if (index > startTimeIndex && index < endTimeIndex) {
          for (let j = 0; j <= 23; j++) {
            oneDay.hours[j] = "selected";
          }
        }
        return oneDay;
      });
    } else {
      // if startTime is after the selected time, startTime reassign as endTime, selected time assing as startTime
      endTime = startTime;
      startTime = newDateMoment.toDate();
      const startTimeIndex = indexInDisplayArray(
        displayDays,
        moment(startTime).format("YYYY-MM-DD")
      );
      const endTimeIndex = indexInDisplayArray(
        displayDays,
        moment(endTime).format("YYYY-MM-DD")
      );
      const startTimeHour = moment.tz(startTime, date.timeZone).hours();
      const endTimeHour = moment.tz(endTime, date.timeZone).hours();
      displayDays.map((oneDay, index) => {
        // and assign "selected" in displayDays
        if (index === startTimeIndex && index === endTimeIndex) {
          for (let j = startTimeHour; j <= date.hour; j++) {
            oneDay.hours[j] = "selected";
          }
        } else if (index === startTimeIndex) {
          for (let j = startTimeHour; j <= 23; j++) {
            oneDay.hours[j] = "selected";
          }
        } else if (index === endTimeIndex) {
          for (let j = 0; j <= endTimeHour; j++) {
            oneDay.hours[j] = "selected";
          }
        } else if (index > startTimeIndex && index < endTimeIndex) {
          for (let j = 0; j <= 23; j++) {
            oneDay.hours[j] = "selected";
          }
        }
        return oneDay;
      });
    }
  }
  dispatch({
    type: bookingTypes.HANDLE_SELECTED_HOUR,
    payload: { startTime, endTime, displayDays },
  });
};

export const bookTimeAction = (hour: Date) => async (dispatch: Dispatch) => {
  dispatch({
    type: bookingTypes.BOOK_TIME_START,
    payload: hour,
  });
};

// export const bookHours = (hour: Date) => async (dispatch: Dispatch) => {
//   dispatch({
//     type: bookingTypes.ADD_HOURS_FOR_BOOKING,
//     payload: hour,
//   });
// };

// export const removeHours = (hoursArray: Array<Date>) => async (
//   dispatch: Dispatch
// ) => {
//   dispatch({
//     type: bookingTypes.REMOVE_HOURS_FROM_BOOKING,
//     payload: hoursArray,
//   });
// };
