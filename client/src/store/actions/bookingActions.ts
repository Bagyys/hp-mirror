import bookingTypes from "../types/bookingTypes";
import { Dispatch } from "redux";

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
