import { Action, Dispatch } from "redux";
// import moment from "moment-timezone";
// import axios, { AxiosResponse } from "axios";
// import Swal from "sweetalert2";

import errorTypes from "../types/errorTypes";

// -------------------- URLS --------------------

// const url = process.env.REACT_APP_SERVER_URL;

// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------

export interface ThrowError extends Action<typeof errorTypes.THROW_ERROR> {
  payload: string;
}
export interface ClearError extends Action<typeof errorTypes.CLEAR_ERRORS> {}

export type ErrorActions = ThrowError | ClearError;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const throwErrorAction = (error: string) => (dispatch: Dispatch) => {
  dispatch({
    type: errorTypes.THROW_ERROR,
    payload: error,
  });
};

export const clearErrorAction = () => (dispatch: Dispatch) => {
  dispatch({
    type: errorTypes.CLEAR_ERRORS,
  });
};
