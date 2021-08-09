import mainPageTypes from "../types/mainPageTypes";
import { Action, Dispatch } from "redux";
// -------------------- URLS --------------------

const url = process.env.REACT_APP_SERVER_URL;

// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------

export interface MainPageInterface {
  type: string;
  payload: {
    startDate: Date;
    endDate: Date;
    proceedToGuests: boolean;
  };
}

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const setStartDateAction = (startDate: Date) => (dispatch: Dispatch) => {
  dispatch({
    type: mainPageTypes.ADD_START_DATE,
    payload: {
      startDate,
    },
  });
};

export const setEndDateAction = (endDate?: Date) => (dispatch: Dispatch) => {
  dispatch({
    type: mainPageTypes.ADD_END_DATE,
    payload: {
      endDate,
    },
  });
};

export const setProceedToGuests =
  (proceedToGuests: boolean) => (dispatch: Dispatch) => {
    dispatch({
      type: mainPageTypes.PROCEED_TO_GUESTS,
      payload: {
        proceedToGuests,
      },
    });
  };
