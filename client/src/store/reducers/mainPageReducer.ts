import mainPageTypes from "../types/mainPageTypes";
import { MainPageInterface } from "../actions/mainPageActions";
export interface InitialState {
  startDate?: Date;
  endDate?: Date;
  proceedToGuests: boolean;
  guests: {
    adults: number;
    children: number;
  };
  isCalendar: boolean;
}

const initialState: InitialState = {
  startDate: undefined,
  endDate: undefined,
  proceedToGuests: false,
  guests: {
    adults: 0,
    children: 0,
  },
  isCalendar: true,
};

const mainPageReducer = (state = initialState, action: MainPageInterface) => {
  switch (action.type) {
    case mainPageTypes.ADD_START_DATE:
      return {
        ...state,
        startDate: action.payload.startDate,
      };
    case mainPageTypes.ADD_END_DATE:
      return {
        ...state,
        endDate: action.payload.endDate,
      };
    case mainPageTypes.PROCEED_TO_GUESTS:
      return {
        ...state,
        proceedToGuests: action.payload.proceedToGuests,
      };
    case mainPageTypes.NUMBER_OF_GUESTS:
      return {
        ...state,
        guests: action.payload.guests,
      };
    case mainPageTypes.TOGGLE_CALENDAR:
      return {
        ...state,
        isCalendar: action.payload.isCalendar,
      };
    default:
      return state;
  }
};

export default mainPageReducer;
