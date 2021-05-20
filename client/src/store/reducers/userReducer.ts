import jwt from "jsonwebtoken";

import userTypes from "../types/userTypes";
import { UserInterface } from "../types/userInterfaces";
import { Actions } from "../actions/userActions";

export interface userState {
  user: UserInterface;
  currentUser: null | { [key: string]: any } | string;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  error: string;
}

export const isValidToken = (token: string | null) => {
  if (token !== null) {
    const decoded = jwt.decode(token);
    const { exp } = decoded as {
      exp: number;
    };
    return new Date(exp * 1000) > new Date() ? decoded : null;
  } else return null;
};

const initialState: userState = {
  user: {
    _id: "",
    email: "",
    password: "",
    name: "",
    isVerified: false,
    verifyToken: "",
    changeEmailToken: "",
    passwordResetToken: "",
    role: "",
    legalEntity: "",
    activeReservations: [],
    pastReservations: [],
    canceledReservations: [],
    favorites: [],
    contacts: {},
  },
  currentUser: localStorage.getItem("token")
    ? isValidToken(localStorage.getItem("token"))
    : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  isAuthenticated: false,
  isLoading: false,
  error: "",
};

const userReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case userTypes.LOAD_USER_REQUEST:
    case userTypes.VERIFY_REQUEST:
    case userTypes.LOG_IN_REQUEST:
    case userTypes.REGISTER_REQUEST:
    case userTypes.LOG_OUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case userTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        currentUser: localStorage.getItem("token")
          ? isValidToken(localStorage.getItem("token"))
          : null,
        token:
          typeof window !== "undefined" ? localStorage.getItem("token") : null,
      };
    case userTypes.LOG_IN_SUCCESS:
    case userTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        // token: action.payload.token,
        token:
          typeof window !== "undefined" ? localStorage.getItem("token") : null,
        currentUser: localStorage.getItem("token")
          ? isValidToken(localStorage.getItem("token"))
          : null,
        user: action.payload.user,
      };
    case userTypes.VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        currentUser: localStorage.getItem("token")
          ? isValidToken(localStorage.getItem("token"))
          : null,
      };
    case userTypes.SEND_VERIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case userTypes.LOG_OUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        currentUser: null,
        user: null,
        token: "",
      };
    case userTypes.LOAD_USER_FAIL:
    case userTypes.REGISTER_FAILURE:
    case userTypes.SEND_VERIFICATION_FAIL:
    case userTypes.VERIFY_FAIL:
    case userTypes.LOG_IN_FAILURE:
    case userTypes.LOG_OUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        currentUser: null,
        user: null,
        isAuthenticated: false,
      };
    case userTypes.CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default userReducer;
