import bookingTypes from "../types/bookingTypes";

// interface Availability {
//   available: boolean;
//   selected: boolean;
// }
// export interface occupiedHour {
//   hour: Date;
//   isWholeHourRented: boolean;
//   minutes: { [key: number]: boolean };
// }
// export interface occupiedDay {
//   date: Date;
//   isRented: boolean;
//   isWholeDayRented: boolean;
//   rentedHours: Array<occupiedHour>;
// }

// export interface Hours {
//   [key: number]: string;
// }
export interface SelectionAvailabilty {
  date: Date;
  isRented: boolean;
  hours: { [key: number]: string };
}
export interface InitialState {
  isAvailabilityChecked: boolean;
  defaultHours: Array<string>;
  selectedDays: Array<Date>;
  startTime: Date | undefined;
  endTime: Date | undefined;
  displayDays: Array<SelectionAvailabilty>;
  hoursForBooking: Array<Date>;
}

const initialState: InitialState = {
  defaultHours: [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ],
  isAvailabilityChecked: false,
  selectedDays: [],
  startTime: undefined,
  endTime: undefined,
  displayDays: [],
  hoursForBooking: [],
};

const bookingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case bookingTypes.CHECK_SELECTED_DAYS:
      return {
        ...state,
        isAvailabilityChecked: true,
        displayDays: action.payload.displayDays,
        selectedDays: action.payload.selectedDays,
      };
    case bookingTypes.ADD_HOURS_FOR_BOOKING:
      return {
        ...state,
        hoursForBooking: [...state.hoursForBooking, action.payload],
      };
    case bookingTypes.REMOVE_HOURS_FROM_BOOKING:
      return {
        ...state,
        hoursForBooking: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;
