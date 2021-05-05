import bookingTypes from "../types/bookingTypes";
import { Actions } from "../actions/bookingActions";

export interface SelectionAvailabilty {
  date: string;
  isRented: boolean;
  hours: { [key: number]: string };
}
export interface InitialState {
  isAvailabilityChecked: boolean;
  selectedDays: Array<Date>;
  startTime: Date | undefined;
  endTime: Date | undefined;
  displayDays: Array<SelectionAvailabilty>;
  totalDays: number;
  totalHours: number;
}

const initialState: InitialState = {
  isAvailabilityChecked: false,
  selectedDays: [],
  startTime: undefined,
  endTime: undefined,
  displayDays: [],
  totalDays: 0,
  totalHours: 0,
};

const bookingReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case bookingTypes.CHECK_SELECTED_DAYS:
      return {
        ...state,
        isAvailabilityChecked: true,
        startTime: undefined,
        endTime: undefined,
        totalDays: 0,
        totalHours: 0,
        displayDays: action.payload.displayDays,
        selectedDays: action.payload.selectedDays,
      };
    case bookingTypes.HANDLE_SELECTED_HOUR:
      return {
        ...state,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        displayDays: action.payload.displayDays,
        totalDays: action.payload.totalDays,
        totalHours: action.payload.totalHours,
      };
    case bookingTypes.BOOK_TIME_START:
      return {
        ...state,
        isAvailabilityChecked: false,
      };
    default:
      return state;
  }
};

export default bookingReducer;
