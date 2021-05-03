import authTypes from "../types/authTypes";
import { Actions } from "../actions/authActions";

export interface userState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  userId: string;
}

const initialState: userState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: false,
  isLoading: true,
  userId: "",
};

const userReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case authTypes.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};

export default userReducer;
