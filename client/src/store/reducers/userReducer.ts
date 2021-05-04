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
  userId: string;
  // _id: string;
  // email: string;
  // password: string;
  // name: string;
  // isVerified: boolean;
  // verifyToken: string;
  // changeEmailToken: string;
  // passwordResetToken: string;
  // role: string;
  // legalEntity: string;
  // activeReservations: Array<ReservationInterface>;
  // pastReservations: Array<ReservationInterface>;
  // canceledReservations: Array<ReservationInterface>;
  // favorites: Array<string>;
  // contacts: Object;
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
    // _id: "607d45c5687db96d68ed41fa", // TODO: make dynamic after login
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
  currentUser: localStorage.getItem("USER-TOKEN")
    ? isValidToken(localStorage.getItem("USER-TOKEN"))
    : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: false,
  isLoading: false,
  userId: "",

  // _id: "607d45c5687db96d68ed41fa", // TODO: make dynamic after login
  // email: "",
  // password: "",
  // name: "",
  // isVerified: false,
  // verifyToken: "",
  // changeEmailToken: "",
  // passwordResetToken: "",
  // role: "",
  // legalEntity: "",
  // activeReservations: [],
  // pastReservations: [],
  // canceledReservations: [],
  // favorites: [],
  // contacts: {},
};

const userReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case userTypes.USER_LOADING:
    case userTypes.LOG_IN_REQUEST:
    case userTypes.REGISTER_REQUEST:
    case userTypes.LOG_OUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case userTypes.LOG_IN_SUCCESS:
    case userTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        // currentUser: action.payload.user,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case userTypes.LOG_OUT_SUCCESS:
      localStorage.removeItem("USER-TOKEN");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        currentUser: null,
        user: null,
        token: "",
      };
    case userTypes.LOG_IN_FAILURE:
    case userTypes.REGISTER_FAILURE:
    case userTypes.LOG_OUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload, // what about errors?
        currentUser: null,
        user: null,
        isAuthenticated: false,
      };
    case userTypes.GET_USER_RESERVATIONS_SUCCESS:
      return {
        ...state,
        activeReservations: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
