import { Action, Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";
// import socket from "../../utilities/socketConnection";

import lockTypes from "../types/lockTypes";
import { LockProps } from "../reducers/lockReducer";

// -------------------- URLS --------------------
// development URL
// const url = process.env.REACT_APP_DEV_URL;

// production URL
const url = process.env.REACT_APP_PROD_URL;
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

export interface GetUnassignedLocksStart
  extends Action<typeof lockTypes.GET_UNASSIGNED_LOCKS_START> {}

export interface GetUnassignedLocksSuccess
  extends Action<typeof lockTypes.GET_UNASSIGNED_LOCKS_SUCCESS> {
  payload: Array<LockProps>;
}

export interface GetUnassignedLocksFail
  extends Action<typeof lockTypes.GET_UNASSIGNED_LOCKS_FAIL> {
  payload: string;
}

export interface AssignLockStart
  extends Action<typeof lockTypes.ASSIGN_LOCK_START> {}

export interface AssignLockSuccess
  extends Action<typeof lockTypes.ASSIGN_LOCK_SUCCESS> {}

export interface AssignLockFail
  extends Action<typeof lockTypes.ASSIGN_LOCK_FAIL> {
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
export interface ThrowError extends Action<typeof lockTypes.THROW_ERROR> {
  payload: string;
}

export interface ClearError extends Action<typeof lockTypes.CLEAR_ERROR> {}

export type Actions =
  | GetAllLocksStart
  | GetAllLocksSuccess
  | GetAllLocksFail
  | GetUnassignedLocksStart
  | GetUnassignedLocksSuccess
  | GetUnassignedLocksFail
  | AssignLockStart
  | AssignLockSuccess
  | AssignLockFail
  | OpenLockStart
  | OpenLockSuccess
  | OpenLockFail
  | UpdateLock
  | ResetLockStart
  | ResetLockSuccess
  | ResetLockFail
  | DeleteLockStart
  | DeleteLockSuccess
  | DeleteLockFail
  | ThrowError
  | ClearError;
// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const getAllLocksAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: lockTypes.GET_ALL_LOCKS_START });
  try {
    const response: AxiosResponse<LockProps> = await axios.get(
      `${url}/door/allLocks/?h=A3%nm*Wb`
    );
    dispatch({
      type: lockTypes.GET_ALL_LOCKS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: lockTypes.GET_ALL_LOCKS_FAIL,
      payload: err.message,
    });
  }
};

export const getUnasSignedLocksAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: lockTypes.GET_UNASSIGNED_LOCKS_START });
  try {
    const response: AxiosResponse<LockProps> = await axios.get(
      `${url}/door/unassignedLocks/?h=A3%nm*Wb`
    );
    dispatch({
      type: lockTypes.GET_UNASSIGNED_LOCKS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: lockTypes.GET_UNASSIGNED_LOCKS_FAIL,
      payload: err.message,
    });
  }
};

export const assignLockAction =
  (lockId: string, propertyId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: lockTypes.ASSIGN_LOCK_START });
    const body = {
      lockId,
      propertyId,
    };
    try {
      const response = await axios.post(`${url}/door/lock/assign/`, body);
      if (response.status === 200) {
        dispatch({
          type: lockTypes.ASSIGN_LOCK_SUCCESS,
        });
        // dispatch({ type: lockTypes.GET_UNASSIGNED_LOCKS_START });
        // try {
        //   const response: AxiosResponse<LockProps> = await axios.get(
        //     `${url}/door/unassignedLocks/?h=A3%nm*Wb`
        //   );
        //   dispatch({
        //     type: lockTypes.GET_UNASSIGNED_LOCKS_SUCCESS,
        //     payload: response.data,
        //   });
        // } catch (err) {
        //   dispatch({
        //     type: lockTypes.GET_UNASSIGNED_LOCKS_FAIL,
        //     payload: err.message,
        //   });
        // }
      } else {
        dispatch({
          type: lockTypes.ASSIGN_LOCK_FAIL,
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({
        type: lockTypes.ASSIGN_LOCK_FAIL,
        payload: err.message,
      });
    }
  };

export const openLockAction =
  (index: number, lockId: string, door: string) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: lockTypes.OPEN_LOCK_START });
    try {
      const response = await axios.put(
        `${url}/door/openLockAdmin/?h=A3%nm*Wb&id=${lockId}&${door}=1`
      );
      if (response.status === 200 && response.data.message === undefined) {
        dispatch({
          type: lockTypes.OPEN_LOCK_SUCCESS,
          payload: { lock: response.data.lock, index },
        });
      } else {
        dispatch({
          type: lockTypes.OPEN_LOCK_FAIL,
          payload: response.data.message,
        });
      }
    } catch (err) {
      dispatch({
        type: lockTypes.OPEN_LOCK_FAIL,
        payload: err.message,
      });
    }
  };

export const updateLockAction =
  (id: string, o1: number, o2: number, o3: number) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: lockTypes.UPDATE_LOCK,
      payload: { id, o1, o2, o3 },
    });
  };

export const resetLockAction =
  (index: number, lockId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: lockTypes.RESET_LOCK_START });

    try {
      const response: AxiosResponse<LockProps> = await axios.put(
        `${url}/door/reset/?h=A3%nm*Wb&id=${lockId}`
      );
      dispatch({
        type: lockTypes.RESET_LOCK_SUCCESS,
        payload: { lock: response.data, index },
      });
    } catch (err) {
      dispatch({
        type: lockTypes.RESET_LOCK_FAIL,
        payload: err.message,
      });
    }
  };

export const deleteLockAction =
  (lockId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: lockTypes.DELETE_LOCK_START });

    try {
      const response: AxiosResponse<boolean> = await axios.delete(
        `${url}/door/delete/?h=A3%nm*Wb&id=${lockId}`
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
      dispatch({
        type: lockTypes.DELETE_LOCK_FAIL,
        payload: err.message,
      });
    }
  };

export const throwErrorAction =
  (message: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: lockTypes.THROW_ERROR,
      payload: message,
    });
  };

export const clearErrorAction = () => async (dispatch: Dispatch) => {
  dispatch({
    type: lockTypes.CLEAR_ERROR,
  });
};

// -------------------- END of ACTIONS --------------------
