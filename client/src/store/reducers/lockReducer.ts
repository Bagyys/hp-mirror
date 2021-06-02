import update from "react-addons-update";

import lockTypes from "../types/lockTypes";
import { LockProps } from "../types/lockInterfaces";
import { LockActions } from "../actions/lockActions";

export interface LockState {
  locks: Array<LockProps>;
  error: string;
}

const initialState: LockState = {
  locks: [] as Array<LockProps>,
  error: "",
};

const lockReducer = (state = initialState, action: LockActions) => {
  switch (action.type) {
    case lockTypes.GET_ALL_LOCKS_SUCCESS:
    case lockTypes.GET_UNASSIGNED_LOCKS_SUCCESS:
    case lockTypes.DELETE_LOCK_SUCCESS:
      return {
        ...state,
        locks: action.payload,
      };
    case lockTypes.UNASSIGN_LOCK_SUCCESS:
    case lockTypes.ASSIGN_LOCK_SUCCESS:
      return {
        ...state,
        locks: action.payload.locks,
      };
    case lockTypes.OPEN_LOCK_SUCCESS:
      return update(state, {
        locks: {
          [action.payload.index]: {
            o1: { $set: action.payload.lock.o1 },
            o2: { $set: action.payload.lock.o2 },
            o3: { $set: action.payload.lock.o3 },
          },
        },
      });
    case lockTypes.UPDATE_LOCK:
      return {
        ...state,
        locks: state.locks.map((lock) =>
          lock._id === action.payload.id
            ? {
                ...lock,
                o1: action.payload.o1,
                o2: action.payload.o2,
                o3: action.payload.o3,
              }
            : lock
        ),
      };
    case lockTypes.RESET_LOCK_SUCCESS:
      return update(state, {
        locks: {
          [action.payload.index]: {
            o1: { $set: action.payload.lock.o1 },
            o2: { $set: action.payload.lock.o2 },
            o3: { $set: action.payload.lock.o3 },
          },
        },
      });
    case lockTypes.GET_ALL_LOCKS_FAIL:
    case lockTypes.GET_UNASSIGNED_LOCKS_FAIL:
    case lockTypes.ASSIGN_LOCK_FAIL:
    case lockTypes.UNASSIGN_LOCK_FAIL:
    case lockTypes.OPEN_LOCK_FAIL:
    case lockTypes.RESET_LOCK_FAIL:
    case lockTypes.DELETE_LOCK_FAIL:
    case lockTypes.THROW_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case lockTypes.CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default lockReducer;
