import bookingTypes from "../types/bookingTypes";

export interface InitialState {
  hoursForBooking: Array<Date>;
}

const initialState: InitialState = {
  hoursForBooking: [],
};

const bookingReducer = (state = initialState, action: any) => {
  switch (action.type) {
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
