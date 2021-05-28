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
  reservationId: string,
  activeReservations: Array<ReservationInterface>
): ReservationInterface => {
  const index = activeReservations.findIndex((reservation) => {
    return reservation._id.toString() === reservationId.toString();
  });
  return activeReservations[index];
};

const reservationReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case reservationTypes.GET_ACTIVE_RESERVATIONS_START:
    case reservationTypes.GET_PAST_RESERVATIONS_START:
      return {
        ...state,
        isFetched: false,
      };
    case reservationTypes.GET_ACTIVE_RESERVATIONS_SUCCESS:
      return {
        ...state,
        isFetched: true,
        activeReservations: action.payload,
      };
    case reservationTypes.GET_PAST_RESERVATIONS_SUCCESS:
      return {
        ...state,
        isFetched: true,
        pastReservations: action.payload,
      };
    case reservationTypes.SELECT_RESERVATION_SUCCESS:
      const cuReservation = getCurrentReservation(
        action.payload.reservation,
        state.activeReservations
      );
      return {
        ...state,
        currentReservation: {
          ...cuReservation,
          lock: action.payload.lock,
        },
      };
    case reservationTypes.UNSELECT_RESERVATION:
      return {
        ...state,
        currentReservation: null,
      };
    case reservationTypes.OPEN_CURRENT_LOCK_SUCCESS:
      return {
        ...state,
        currentReservation: {
          ...state.currentReservation,
          lock: action.payload.lock,
        },
      };
    case reservationTypes.UPDATE_CURRENT_LOCK:
      if (state.currentReservation) {
        return {
          ...state,
          currentReservation: {
            ...state.currentReservation,
            lock: {
              ...state.currentReservation.lock,
              o1: action.payload.o1,
              o2: action.payload.o2,
              o3: action.payload.o3,
            },
          },
        };
      } else return { ...state };
    case reservationTypes.GET_ACTIVE_RESERVATIONS_FAIL:
    case reservationTypes.GET_PAST_RESERVATIONS_FAIL:
    case reservationTypes.SELECT_RESERVATION_FAIL:
    case reservationTypes.OPEN_CURRENT_LOCK_FAIL:
      return {
        ...state,
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
