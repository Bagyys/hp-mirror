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
    guests: {
      adults: number;
      children: number;
    };
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

export const setNumberOfAdultsAndChildren =
  (adults: number, children: number) => (dispatch: Dispatch) => {
    const guests = {
      adults,
      children,
    };
    dispatch({
      type: mainPageTypes.NUMBER_OF_GUESTS,
      payload: {
        guests,
      },
    });
  };