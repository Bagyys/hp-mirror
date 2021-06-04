import { Action, Dispatch } from "redux";
import moment from "moment-timezone";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

import { OccupiedDayInterface } from "../types/propertyInterfaces";
import { SelectionAvailabilty } from "../reducers/bookingReducer";
import {
  indexInArray,
  indexInDisplayArray,
  formAvailableDayHours,
  formOccupiedDayHours,
  unselectDayHours,
} from "../../utilities/booking";
import bookingTypes from "../types/bookingTypes";
import errorTypes from "../types/errorTypes";
import { ReservationInterface } from "../types/reservationInterfaces";

// -------------------- URLS --------------------

const url = process.env.REACT_APP_SERVER_URL;

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
    totalDays: number;
    totalHours: number;
  };
}

export interface BookTimeStart
  extends Action<typeof bookingTypes.BOOK_TIME_START> {}

export interface BookTimeSuccess
  extends Action<typeof bookingTypes.BOOK_TIME_SUCCESS> {
  payload: ReservationInterface;
}

export interface BookTimeFail
  extends Action<typeof bookingTypes.BOOK_TIME_FAIL> {}

export type BookingActions =
  | CheckAvailability
  | SelectHour
  | BookTimeStart
  | BookTimeSuccess
  | BookTimeFail;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const checkAvailabilityAction =
  (selectedDays: Array<Date>, occupiedTime: Array<OccupiedDayInterface>) =>
  (dispatch: Dispatch) => {
    const displayDays = selectedDays.map((selectedDay: Date) => {
      const occIndex = indexInArray(occupiedTime, selectedDay);
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
          hours: formOccupiedDayHours(occupiedTime[occIndex].hours),
        };
      }
      return displayDay;
    });
    dispatch({
      type: bookingTypes.CHECK_SELECTED_DAYS,
      payload: {
        displayDays,
        selectedDays,
      },
    });
  };

export const selectHourAction =
  (
    date: {
      hour: number;
      day: string;
      dayIndex: number;
      timeZone: string;
    },
    startTime: Date | undefined,
    endTime: Date | undefined,
    displayDays: Array<SelectionAvailabilty>
  ) =>
  (dispatch: Dispatch) => {
    const newDateString =
      date.hour < 10
        ? `${date.day} 0${date.hour}:00`
        : `${date.day} ${date.hour}:00`;
    const newDateMoment = moment.tz(newDateString, date.timeZone);
    let totalHours = 0;
    let totalDays = 0;

    if (startTime === undefined) {
      // if startTime is undefined -> assign the selected time to it
      const dayIndex = indexInDisplayArray(displayDays, date.day);
      startTime = newDateMoment.toDate();
      totalHours = 0;
      totalDays = 0;
      //    - and assign "selected" in displayDays
      displayDays[dayIndex].hours[date.hour] = "selected";
    } else if (startTime !== undefined && endTime !== undefined) {
      // if startTime and endTime are both defined -> reset startTime to the new selected time, endTime to undefined
      const dayIndex = indexInDisplayArray(displayDays, date.day);
      startTime = newDateMoment.toDate();
      endTime = undefined;
      totalHours = 0;
      totalDays = 0;
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
        // console.log("startTime");
        // console.log(startTime);
        // console.log("newDateMoment");
        // console.log(newDateMoment);
        endTime = newDateMoment.toDate();
        const startTimeIndex = indexInDisplayArray(
          displayDays,
          moment(startTime).format("YYYY-MM-DD")
        );
        const endTimeIndex = indexInDisplayArray(
          displayDays,
          moment(endTime).format("YYYY-MM-DD")
        );
        // console.log("startTimeIndex");
        // console.log(startTimeIndex);
        // console.log("endTimeIndex");
        // console.log(newDateMoment.toDate());

        const startTimeHour = moment.tz(startTime, date.timeZone).hours();
        const endTimeHour = moment.tz(endTime, date.timeZone).hours();
        let unavailableHours = false;
        // and assign "selected" in displayDays
        const dDaysArray = displayDays.map((oneDay, index) => {
          let mutatedDay = JSON.parse(JSON.stringify(oneDay));
          if (index === startTimeIndex && index === endTimeIndex) {
            ++totalDays;
            for (let j = startTimeHour; j <= endTimeHour; j++) {
              if (mutatedDay.hours[j] === "available") {
                mutatedDay.hours[j] = "selected";
                ++totalHours;
              } else if (mutatedDay.hours[j] === "selected") {
                ++totalHours;
              } else {
                unavailableHours = true;
              }
            }
          } else if (index === startTimeIndex) {
            ++totalDays;
            for (let j = startTimeHour; j <= 23; j++) {
              if (mutatedDay.hours[j] === "available") {
                mutatedDay.hours[j] = "selected";
                ++totalHours;
              } else if (mutatedDay.hours[j] === "selected") {
                ++totalHours;
              } else {
                unavailableHours = true;
              }
            }
          } else if (index === endTimeIndex) {
            ++totalDays;
            for (let j = 0; j <= endTimeHour; j++) {
              if (mutatedDay.hours[j] === "available") {
                mutatedDay.hours[j] = "selected";
                ++totalHours;
              } else if (mutatedDay.hours[j] === "selected") {
                ++totalHours;
              } else {
                unavailableHours = true;
              }
            }
          } else if (index > startTimeIndex && index < endTimeIndex) {
            ++totalDays;
            for (let j = 0; j <= 23; j++) {
              if (mutatedDay.hours[j] === "available") {
                mutatedDay.hours[j] = "selected";
                ++totalHours;
              } else if (mutatedDay.hours[j] === "selected") {
                ++totalHours;
              } else {
                unavailableHours = true;
              }
            }
          }
          if (unavailableHours) {
            Swal.fire("This time is unavailable");
            return oneDay;
          } else {
            return mutatedDay;
          }
        });
        if (!unavailableHours) {
          displayDays = dDaysArray;
        }
      } else {
        // console.log("startTime");
        // console.log(startTime);
        // console.log("newDateMoment");
        // console.log(newDateMoment.toDate());
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
        let unavailableHours = false;
        // and assign "selected" in displayDays
        const dDaysArray = displayDays.map((oneDay, index) => {
          let mutatedDay = JSON.parse(JSON.stringify(oneDay));
          if (index === startTimeIndex && index === endTimeIndex) {
            ++totalDays;
            for (let j = startTimeHour; j <= endTimeHour; j++) {
              if (mutatedDay.hours[j] === "available") {
                mutatedDay.hours[j] = "selected";
                ++totalHours;
              } else if (mutatedDay.hours[j] === "selected") {
                ++totalHours;
              } else {
                unavailableHours = true;
              }
            }
          } else if (index === startTimeIndex) {
            ++totalDays;
            for (let j = startTimeHour; j <= 23; j++) {
              if (mutatedDay.hours[j] === "available") {
                mutatedDay.hours[j] = "selected";
                ++totalHours;
              } else if (mutatedDay.hours[j] === "selected") {
                ++totalHours;
              } else {
                unavailableHours = true;
              }
            }
          } else if (index === endTimeIndex) {
            ++totalDays;
            for (let j = 0; j <= endTimeHour; j++) {
              if (mutatedDay.hours[j] === "available") {
                mutatedDay.hours[j] = "selected";
                ++totalHours;
              } else if (mutatedDay.hours[j] === "selected") {
                ++totalHours;
              } else {
                unavailableHours = true;
              }
            }
          } else if (index > startTimeIndex && index < endTimeIndex) {
            ++totalDays;
            for (let j = 0; j <= 23; j++) {
              if (mutatedDay.hours[j] === "available") {
                mutatedDay.hours[j] = "selected";
                ++totalHours;
              } else if (mutatedDay.hours[j] === "selected") {
                ++totalHours;
              } else {
                unavailableHours = true;
              }
            }
          }
          if (unavailableHours) {
            Swal.fire("This time is unavailable");
            return oneDay;
          } else {
            return mutatedDay;
          }
        });
        if (!unavailableHours) {
          displayDays = dDaysArray;
        }
      }
    }
    dispatch({
      type: bookingTypes.HANDLE_SELECTED_HOUR,
      payload: { startTime, endTime, displayDays, totalHours, totalDays },
    });
  };

export const bookTimeAction =
  (body: {
    userId: string;
    propertyId: string;
    residents: number;
    price: number;
    startDate: Date;
    endDate: Date;
    timeZone: string;
    occupiedTime: Array<SelectionAvailabilty>;
  }) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: bookingTypes.BOOK_TIME_START,
    });
    try {
      const response: AxiosResponse<{
        reservation: ReservationInterface;
        message: string;
      }> = await axios.post(`${url}/reservation/addReservation`, body);
      if (
        response.status === 200 &&
        response.data.message === undefined &&
        response.data.reservation !== undefined
      ) {
        Swal.fire("succesfully booked");
        dispatch({
          type: bookingTypes.BOOK_TIME_SUCCESS,
          payload: response.data.reservation,
        });
      } else {
        dispatch({
          type: bookingTypes.BOOK_TIME_FAIL,
        });
        dispatch({
          type: errorTypes.THROW_ERROR,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: bookingTypes.BOOK_TIME_FAIL,
      });
      dispatch({
        type: errorTypes.THROW_ERROR,
        payload: error.response,
      });
    }
  };
