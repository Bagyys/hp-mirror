import errorTypes from "../types/errorTypes";
import { ErrorActions } from "../actions/errorActions";

export interface ErrorState {
  error: string;
}

const initialState: ErrorState = {
  error: "",
};

const errorReducer = (state = initialState, action: ErrorActions) => {
  switch (action.type) {
    case errorTypes.THROW_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case errorTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default errorReducer;
