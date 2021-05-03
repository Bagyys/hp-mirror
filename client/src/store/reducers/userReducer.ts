import userTypes from "../types/userTypes";
import { ReservationInterface } from "../types/reservationInterfaces";
import { Actions } from "../actions/userActions";

export interface userState {
  _id: string;
  email: string;
  password: string;
  name: string;
  isVerified: boolean;
  verifyToken: string;
  changeEmailToken: string;
  passwordResetToken: string;
  role: string;
  legalEntity: string;
  activeReservations: Array<ReservationInterface>;
  pastReservations: Array<ReservationInterface>;
  canceledReservations: Array<ReservationInterface>;
  favorites: Array<string>;
  contacts: Object;
}

const initialState: userState = {
  _id: "607d45c5687db96d68ed41fa", // TODO: make dynamic after login
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
};

const userReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
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
