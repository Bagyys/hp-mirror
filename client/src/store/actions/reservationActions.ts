import { Action, Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";
// import moment from "moment-timezone";
// import Swal from "sweetalert2";
import { StoreState } from "../configureStore";
import reservationTypes from "../types/reservationTypes";
import { ReservationInterface } from "../types/reservationInterfaces";
import { LockProps } from "../reducers/lockReducer";
// -------------------- URLS --------------------
// development URL
const url = process.env.REACT_APP_DEV_URL;

// production URL
// const url = process.env.REACT_APP_PROD_URL;
// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------

export interface GetUserReservationsStart
  extends Action<typeof reservationTypes.GET_ACTIVE_RESERVATIONS_START> {}

export interface GetUserReservationsSuccess
  extends Action<typeof reservationTypes.GET_ACTIVE_RESERVATIONS_SUCCESS> {
  payload: Array<ReservationInterface>;
}

export interface GetUserReservationsFail
  extends Action<typeof reservationTypes.GET_ACTIVE_RESERVATIONS_FAIL> {
  payload: string;
}

export interface SelectReservationStart
  extends Action<typeof reservationTypes.SELECT_RESERVATION_START> {}

export interface SelectReservationSuccess
  extends Action<typeof reservationTypes.SELECT_RESERVATION_SUCCESS> {
  payload: { reservation: string; lock: LockProps };
}
export interface SelectReservationFail
  extends Action<typeof reservationTypes.SELECT_RESERVATION_FAIL> {
  payload: string;
}

export interface UnelectReservation
  extends Action<typeof reservationTypes.UNSELECT_RESERVATION> {}

export interface OpenCurrentLockStart
  extends Action<typeof reservationTypes.OPEN_CURRENT_LOCK_START> {}

export interface OpenCurrentLockSuccess
  extends Action<typeof reservationTypes.OPEN_CURRENT_LOCK_SUCCESS> {
  payload: { lock: LockProps; message: string };
}

export interface OpenCurrentLockFail
  extends Action<typeof reservationTypes.OPEN_CURRENT_LOCK_FAIL> {
  payload: { message: string };
}

export interface UpdateCurrentLock
  extends Action<typeof reservationTypes.UPDATE_CURRENT_LOCK> {
  payload: { o1: number; o2: number; o3: number };
}

export interface ClearError
  extends Action<typeof reservationTypes.CLEAR_ERROR> {}

export type Actions =
  | GetUserReservationsStart
  | GetUserReservationsSuccess
  | GetUserReservationsFail
  | SelectReservationStart
  | SelectReservationSuccess
  | SelectReservationFail
  | UnelectReservation
  | OpenCurrentLockStart
  | OpenCurrentLockSuccess
  | OpenCurrentLockFail
  | UpdateCurrentLock
  | ClearError;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const getActiveReservationsAction =
  (userId: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: reservationTypes.GET_ACTIVE_RESERVATIONS_START,
    });
    try {
      const response: AxiosResponse<ReservationInterface> = await axios.get(
        `${url}/reservation/getReservations/${userId}`
      );
      dispatch({
        type: reservationTypes.GET_ACTIVE_RESERVATIONS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: reservationTypes.GET_ACTIVE_RESERVATIONS_FAIL,
        payload: error.message,
      });
    }
  };

export const selectReservationAction =
  (reservationId: string, propertyId: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: reservationTypes.SELECT_RESERVATION_START,
    });
    try {
      const response: AxiosResponse<ReservationInterface> = await axios.get(
        `${url}/door/getLockByProperty/${propertyId}`
      );
      dispatch({
        type: reservationTypes.SELECT_RESERVATION_SUCCESS,
        payload: { reservation: reservationId, lock: response.data },
      });
    } catch (error) {
      dispatch({
        type: reservationTypes.SELECT_RESERVATION_FAIL,
        payload: error.message,
      });
    }
  };

export const unselectReservationAction = () => async (dispatch: Dispatch) => {
  dispatch({
    type: reservationTypes.UNSELECT_RESERVATION,
  });
};

export const openCurrentLockAction =
  (lockId: string, reservationId: string, door: string) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: reservationTypes.OPEN_CURRENT_LOCK_START });
    try {
      const response = await axios.put(
        `${url}/door/openLock/?h=A3%nm*Wb&lock=${lockId}&reservation=${reservationId}&${door}=1`
      );
      if (response.status === 200 && response.data.message === undefined) {
        dispatch({
          type: reservationTypes.OPEN_CURRENT_LOCK_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: reservationTypes.OPEN_CURRENT_LOCK_FAIL,
          payload: response.data.message,
        });
      }
    } catch (err) {
      dispatch({
        type: reservationTypes.OPEN_CURRENT_LOCK_FAIL,
        payload: err.message,
      });
    }
  };

export const updateCurrentLockAction =
  (o1: number, o2: number, o3: number) => async (dispatch: Dispatch) => {
    dispatch({
      type: reservationTypes.UPDATE_CURRENT_LOCK,
      payload: { o1, o2, o3 },
    });
  };

export const clearErrorAction = () => async (dispatch: Dispatch) => {
  dispatch({
    type: reservationTypes.CLEAR_ERROR,
  });
};
