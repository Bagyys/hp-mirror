import { Action, Dispatch } from "redux";
import moment from "moment";
import axios, { AxiosResponse } from "axios";

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
    displayDays: Array<SelectionAvailabilty>;
    selectedDays: Array<Date>;
  };
}

export type Actions = CheckAvailability | SelectHour;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- HELPERS --------------------

const indexInArray = (array: Array<any>, value: Date): number => {
  // TODO add typescript interface

  console.log("value");
  console.log(value);
  // const newD = new Date(Date.parse(value.toISOString()));
  // console.log("newD");
  // console.log(newD);
  // console.log("newD.getTime()");
  // console.log(newD.getTime());
  // console.log("newD.toUTCString()");
  // console.log(newD.toUTCString());
  return array.findIndex((item) => {
    // console.log("item.date");
    // console.log(item.date);
    // console.log("moment(item.date).toDate()");
    // console.log(moment(item.date).toDate());
    // console.log("moment(item.date).isSame(value)");
    // console.log(moment(item.date).isSame(value));
    // console.log(
    //   "moment(moment(item.date).startOf(day).toDate()).isSame(value)"
    // );
    // console.log(
    //   moment(moment(item.date).startOf("day").toDate()).isSame(value)
    // );
    // console.log("item.date.toISOString()");
    // console.log(new Date(item.date).toISOString());
    // console.log("item.isRented");
    // console.log(item.isRented);
    // console.log("new Date(item.date).getTime()");
    // console.log(new Date(item.date).getTime());
    // console.log("value.getTime()");
    // console.log(value.getTime());
    return (
      item.isRented &&
      moment(moment(item.date).startOf("day").toDate()).isSame(value)
      // new Date(item.date).getFullYear() === value.getFullYear() &&
      // new Date(item.date).getMonth() === value.getMonth() &&
      // new Date(item.date).getDate() === value.getDate()
    );
    // return item.isRented && new Date(item.date).getTime() === value.getTime();
  });
};

const formAvailableDayHours = () => {
  let availableHours = {};
  for (let i = 0; i < 24; i++) {
    const hour = { [i]: "available" };
    availableHours = { ...availableHours, ...hour };
  }
  // console.log("availableHours");
  // console.log(availableHours);
  return availableHours;
};

const formOccupiedDayHours = (rentedHours: Array<OccupiedHour>) => {
  // console.log("formOccupiedDayHours");
  // console.log("rentedHours");
  // console.log(rentedHours);
  let occupiedHours = {};
  for (let i = 0; i < 24; i++) {
    const occIndex = rentedHours.findIndex((rentedHour) => {
      // console.log("rentedHour");
      // console.log(rentedHour);
      // console.log("new Date(rentedHour.hour).getHours()");
      // console.log(new Date(rentedHour.hour).getHours());
      // new Date(rentedHour.hour).getHours
      return new Date(rentedHour.hour).getHours() === i;
    });
    // console.log("occIndex");
    // console.log(occIndex);
    let hour = {};
    occIndex < 0
      ? (hour = { [i]: "available" })
      : (hour = { [i]: "unavailable" });
    occupiedHours = { ...occupiedHours, ...hour };
  }
  // console.log("occupiedHours");
  // console.log(occupiedHours);
  return occupiedHours;
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
    console.log("selectedDay");
    console.log(selectedDay);
    const occIndex = indexInArray(occupiedTime, selectedDay);

    // const hours = formAvailableDayHours();
    let displayDay;
    if (occIndex < 0) {
      displayDay = {
        date: selectedDay,
        isRented: false,
        hours: formAvailableDayHours(),
      };
    } else {
      displayDay = {
        date: selectedDay,
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
  hour: number,
  day: Date,
  startTime: Date | undefined,
  endTime: Date | undefined,
  displayDays: Array<SelectionAvailabilty>
) => async (dispatch: Dispatch) => {
  console.log("selectHourAction");
  console.log("hour");
  console.log(hour);
  console.log("day");
  console.log(day);
  console.log("startTime");
  console.log(startTime);
  console.log("endTime");
  console.log(endTime);
  console.log("displayDays");
  console.log(displayDays);
  // if startTime is undefined -> assign the selected time to it
  //    - and assign "selected" in displayDays
  // if startTime is not undefined -> check if the selected time is greater or less than startTime
  // - if greater -> assign the selected time to endTime
  //    - and assign "selected" in displayDays
  // - if less -> assign starTime to endTime and selected time to startTime
  //    - and assign "selected" in displayDays

  // dispatch({
  //   type: bookingTypes.HANDLE_SELECTED_HOUR,
  //   payload: undefined,
  // });
};

export const bookHours = (hour: Date) => async (dispatch: Dispatch) => {
  dispatch({
    type: bookingTypes.ADD_HOURS_FOR_BOOKING,
    payload: hour,
  });
};

export const removeHours = (hoursArray: Array<Date>) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: bookingTypes.REMOVE_HOURS_FROM_BOOKING,
    payload: hoursArray,
  });
};
