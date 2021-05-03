import { Action, Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";
// import moment from "moment-timezone";
// import Swal from "sweetalert2";

import userTypes from "../types/userTypes";
import { ReservationInterface } from "../types/reservationInterfaces";

// -------------------- URLS --------------------
// development URL
const url = process.env.REACT_APP_DEV_URL;

// production URL
// const url = process.env.REACT_APP_PROD_URL;
// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------

export interface GetUserReservationsStart
  extends Action<typeof userTypes.GET_USER_RESERVATIONS_START> {}

export interface GetUserReservationsSuccess
  extends Action<typeof userTypes.GET_USER_RESERVATIONS_SUCCESS> {
  payload: Array<ReservationInterface>;
}

export interface GetUserReservationsFail
  extends Action<typeof userTypes.GET_USER_RESERVATIONS_FAIL> {
  payload: string;
}

export type Actions =
  | GetUserReservationsStart
  | GetUserReservationsSuccess
  | GetUserReservationsFail;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const getUserReservationsAction = (userId: string) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: userTypes.GET_USER_RESERVATIONS_START,
  });
  try {
    const response: AxiosResponse<ReservationInterface> = await axios.get(
      `${url}/user/getReservations/${userId}`
    );
    console.log("response.data");
    console.log(response.data);
    dispatch({
      type: userTypes.GET_USER_RESERVATIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: userTypes.GET_USER_RESERVATIONS_FAIL,
    });
  }
};
