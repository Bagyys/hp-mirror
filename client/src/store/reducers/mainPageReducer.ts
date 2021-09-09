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
  isSearching: boolean;
  anytimeOrCalendar: null | string;
  isChoosing: null | boolean;
  searchedDayList:Array<string>;
}

const initialState: InitialState = {
  startDate: new Date(),
  endDate: new Date(),
  proceedToGuests: false,
  guests: {
    adults: 0,
    children: 0,
  },
  isCalendar: true,
  isSearching: false,
  anytimeOrCalendar: null,
  isChoosing: true,
  searchedDayList:[]
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
    case mainPageTypes.TOGGLE_SEARCHING:
      return {
        ...state,
        isSearching: action.payload.isSearching,
      };
    case mainPageTypes.TOGGLE_ANYTIME_OR_CALENDAR:
      return {
        ...state,
        anytimeOrCalendar: action.payload.anytimeOrCalendar,
      };
    case mainPageTypes.TOGGLE_CHOOSING:
      return {
        ...state,
        isChoosing: action.payload.isChoosing,
      };
    case mainPageTypes.ADD_SEARCHED_DAY_LIST:
      return {
        ...state,
        searchedDayList: action.payload.searchedDayList,
      };
    default:
      return state;
  }
};

export default mainPageReducer;
