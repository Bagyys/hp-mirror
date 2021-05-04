import jwt from "jsonwebtoken";
import authTypes from "../types/authTypes";
import { Actions } from "../actions/authActions";

export interface userState {
  currentUser: null | { [key: string]: any } | string;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  userId: string;
}

export const isValidToken = (token: string | null) => {
  if (token !== null) {
    const decoded = jwt.decode(token);
    const { exp } = jwt.decode(token) as {
      exp: number;
    };
    return new Date(exp * 1000) > new Date() ? decoded : null;
  } else return null;
};

const initialState: userState = {
  currentUser: localStorage.getItem("USER-TOKEN")
    ? isValidToken(localStorage.getItem("USER-TOKEN"))
    : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: false,
  isLoading: false,
  userId: "",
};

const userReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case authTypes.USER_LOADING:
    case authTypes.LOG_IN_REQUEST:
    case authTypes.REGISTER_REQUEST:
    case authTypes.LOG_OUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case authTypes.LOG_IN_SUCCESS:
    case authTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        // currentUser: action.payload.user,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case authTypes.LOG_OUT_SUCCESS:
      localStorage.removeItem("USER-TOKEN");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        currentUser: null,
        user: null,
        token: "",
      };
    case authTypes.LOG_IN_FAILURE:
    case authTypes.REGISTER_FAILURE:
    case authTypes.LOG_OUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload, // what about errors?
        currentUser: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
