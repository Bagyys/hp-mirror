import reservationTypes from "../types/reservationTypes";
import { ReservationInterface } from "../types/reservationInterfaces";
import { Actions } from "../actions/reservationActions";

export interface reservationState {
  isFetched: boolean;
  currentReservation: ReservationInterface | null;
  activeReservations: Array<ReservationInterface>;
  pastReservations: Array<ReservationInterface>;
  canceledReservations: Array<ReservationInterface>;
  error: string;
}

const initialState: reservationState = {
  isFetched: false,
  currentReservation: null,
  activeReservations: [],
  pastReservations: [],
  canceledReservations: [],
  error: "",
};

const getCurrentReservation = (
  propertyId: string,
  activeReservations: Array<ReservationInterface>
): ReservationInterface => {
  const index = activeReservations.findIndex((reservation) => {
    return reservation.propertyId.toString() === propertyId.toString();
  });
  return activeReservations[index];
  // return index === -1 ? activeReservations[index] : null;
};

const reservationReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case reservationTypes.GET_ACTIVE_RESERVATIONS_SUCCESS:
      return {
        ...state,
        isFetched: true,
        activeReservations: action.payload,
      };
    case reservationTypes.SELECT_RESERVATION_SUCCESS:
      const cuReservation = getCurrentReservation(
        action.payload.property,
        state.activeReservations
      );
      return {
        ...state,
        currentReservation: {
          ...cuReservation,
          lock: action.payload.lock,
        },
      };
    case reservationTypes.GET_ACTIVE_RESERVATIONS_FAIL:
    case reservationTypes.SELECT_RESERVATION_FAIL:
      return {
        ...state,
        // isFetched: false,
        error: action.payload,
      };
    case reservationTypes.CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default reservationReducer;
