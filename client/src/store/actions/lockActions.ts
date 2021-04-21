import { Action, Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";
// import socket from "../../utilities/socketConnection";

import lockTypes from "../types/lockTypes";
import { LockProps } from "../reducers/lockReducer";

// -------------------- URLS --------------------
// development URL
const url = process.env.REACT_APP_DEV_URL;

// production URL
// const url = process.env.REACT_APP_PROD_URL;
// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------
export interface GetAllLocksStart
  extends Action<typeof lockTypes.GET_ALL_LOCKS_START> {}

export interface GetAllLocksSuccess
  extends Action<typeof lockTypes.GET_ALL_LOCKS_SUCCESS> {
  payload: Array<LockProps>;
}

export interface GetAllLocksFail
  extends Action<typeof lockTypes.GET_ALL_LOCKS_FAIL> {
  payload: string;
}

export interface OpenLockStart
  extends Action<typeof lockTypes.OPEN_LOCK_START> {}

export interface OpenLockSuccess
  extends Action<typeof lockTypes.OPEN_LOCK_SUCCESS> {
  payload: { lock: LockProps; index: number };
}

export interface OpenLockFail extends Action<typeof lockTypes.OPEN_LOCK_FAIL> {
  payload: string;
}

export interface UpdateLock extends Action<typeof lockTypes.UPDATE_LOCK> {
  payload: { id: string; o1: number; o2: number; o3: number };
}

export interface ResetLockStart
  extends Action<typeof lockTypes.RESET_LOCK_START> {}

export interface ResetLockSuccess
  extends Action<typeof lockTypes.RESET_LOCK_SUCCESS> {
  payload: { lock: LockProps; index: number };
}

export interface ResetLockFail
  extends Action<typeof lockTypes.RESET_LOCK_FAIL> {
  payload: string;
}

export interface DeleteLockStart
  extends Action<typeof lockTypes.DELETE_LOCK_START> {}

export interface DeleteLockSuccess
  extends Action<typeof lockTypes.DELETE_LOCK_SUCCESS> {
  payload: Array<LockProps>;
}

export interface DeleteLockFail
  extends Action<typeof lockTypes.DELETE_LOCK_FAIL> {
  payload: string;
}

export type Actions =
  | GetAllLocksStart
  | GetAllLocksSuccess
  | GetAllLocksFail
  | OpenLockStart
  | OpenLockSuccess
  | OpenLockFail
  | UpdateLock
  | ResetLockStart
  | ResetLockSuccess
  | ResetLockFail
  | DeleteLockStart
  | DeleteLockSuccess
  | DeleteLockFail;
// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const getAllLocksAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: lockTypes.GET_ALL_LOCKS_START });
  try {
    const response: AxiosResponse<LockProps> = await axios.get(
      `${url}/allLocks/?h=A3%nm*Wb`
    );
    dispatch({
      type: lockTypes.GET_ALL_LOCKS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    console.log("Erroras");
    dispatch({
      type: lockTypes.GET_ALL_LOCKS_FAIL,
    });
  }
};

export const openLockAction = (
  index: number,
  lockId: string,
  door: string
) => async (dispatch: Dispatch) => {
  dispatch({ type: lockTypes.OPEN_LOCK_START });
  try {
    const response: AxiosResponse<LockProps> = await axios.put(
      `${url}/openLock/?h=A3%nm*Wb&id=${lockId}&${door}=1`
    );
    dispatch({
      type: lockTypes.OPEN_LOCK_SUCCESS,
      payload: { lock: response.data, index },
    });
  } catch (err) {
    console.log("Erroras");
    dispatch({
      type: lockTypes.OPEN_LOCK_FAIL,
    });
  }
};

export const updateLockAction = (
  id: string,
  o1: number,
  o2: number,
  o3: number
) => async (dispatch: Dispatch) => {
  dispatch({
    type: lockTypes.UPDATE_LOCK,
    payload: { id, o1, o2, o3 },
  });
};

export const resetLockAction = (index: number, lockId: string) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: lockTypes.RESET_LOCK_START });

  try {
    const response: AxiosResponse<LockProps> = await axios.put(
      `${url}/reset/?h=A3%nm*Wb&id=${lockId}`
    );
    dispatch({
      type: lockTypes.RESET_LOCK_SUCCESS,
      payload: { lock: response.data, index },
    });
  } catch (err) {
    console.log("Erroras");
    dispatch({
      type: lockTypes.RESET_LOCK_FAIL,
    });
  }
};

export const deleteLockAction = (lockId: string) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: lockTypes.DELETE_LOCK_START });

  try {
    const response: AxiosResponse<boolean> = await axios.delete(
      `${url}/delete/?h=A3%nm*Wb&id=${lockId}`
    );
    response.status === 200
      ? dispatch({
          type: lockTypes.DELETE_LOCK_SUCCESS,
          payload: response.data,
        })
      : dispatch({
          type: lockTypes.DELETE_LOCK_FAIL,
        });
  } catch (err) {
    console.log("Erroras");
    dispatch({
      type: lockTypes.DELETE_LOCK_FAIL,
    });
  }
};

// -------------------- END of ACTIONS --------------------
