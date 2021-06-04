import { Action, Dispatch } from "redux";

import errorTypes from "../types/errorTypes";

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
