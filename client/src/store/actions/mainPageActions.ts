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
    isCalendar: boolean;
    isSearching: boolean;
    anytimeOrCalendar: string;
    isChoosing: boolean;
    searchedDayList:Array<string>;
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

export const toggleIsCalendar =
  (isCalendar: boolean) => (dispatch: Dispatch) => {
    dispatch({
      type: mainPageTypes.TOGGLE_CALENDAR,
      payload: {
        isCalendar,
      },
    });
  };

export const toggleIsSearching =
  (isSearching: boolean) => (dispatch: Dispatch) => {
    dispatch({
      type: mainPageTypes.TOGGLE_SEARCHING,
      payload: {
        isSearching,
      },
    });
  };

export const toggleAnytimeOrCalendar =
  (anytimeOrCalendar: string) => (dispatch: Dispatch) => {
    dispatch({
      type: mainPageTypes.TOGGLE_ANYTIME_OR_CALENDAR,
      payload: {
        anytimeOrCalendar,
      },
    });
  };

export const toggleIsChoosing =
  (isChoosing: boolean) => (dispatch: Dispatch) => {
    dispatch({
      type: mainPageTypes.TOGGLE_CHOOSING,
      payload: {
        isChoosing,
      },
    });
  };
  //pridedu pasirinktu dienu lista i main reduceri
  export const addSearchingDayList =
  (searchedDayList: Array<string>) => (dispatch: Dispatch) => {
    dispatch({
      type: mainPageTypes.ADD_SEARCHED_DAY_LIST,
      payload: {searchedDayList},
    });
  };
