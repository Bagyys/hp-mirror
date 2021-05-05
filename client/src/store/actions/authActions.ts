import { Action, Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";
import { UserInterface } from "../types/userInterfaces";
// import moment from "moment-timezone";
// import Swal from "sweetalert2";

import authTypes from "../types/authTypes";

// -------------------- URLS --------------------
// development URL
const url = process.env.REACT_APP_DEV_URL;

// production URL
// const url = process.env.REACT_APP_PROD_URL;
// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------

export interface UserLoading extends Action<typeof authTypes.USER_LOADING> {}

export interface RegisterRequest
  extends Action<typeof authTypes.REGISTER_REQUEST> {}

export interface RegisterSuccess
  extends Action<typeof authTypes.REGISTER_SUCCESS> {
  payload: { token: string; user: UserInterface };
}

export interface RegisterFail
  extends Action<typeof authTypes.REGISTER_FAILURE> {
  payload: string;
}

export interface LoginRequest extends Action<typeof authTypes.LOG_IN_REQUEST> {}

export interface LoginSuccess extends Action<typeof authTypes.LOG_IN_SUCCESS> {
  payload: { token: string; user: UserInterface };
}

export interface LoginFail extends Action<typeof authTypes.LOG_IN_FAILURE> {
  payload: string;
}

export interface LogoutRequest
  extends Action<typeof authTypes.LOG_OUT_REQUEST> {}

export interface LogoutSuccess
  extends Action<typeof authTypes.LOG_OUT_SUCCESS> {}

export interface LogoutFail extends Action<typeof authTypes.LOG_OUT_FAILURE> {
  payload: string;
}

// export interface GetUserReservationsStart
//   extends Action<typeof userTypes.GET_USER_RESERVATIONS_START> {}

// export interface GetUserReservationsSuccess
//   extends Action<typeof userTypes.GET_USER_RESERVATIONS_SUCCESS> {
//   payload: Array<ReservationInterface>;
// }

// export interface GetUserReservationsFail
//   extends Action<typeof userTypes.GET_USER_RESERVATIONS_FAIL> {
//   payload: string;
// }

export type Actions =
  | UserLoading
  | RegisterRequest
  | RegisterSuccess
  | RegisterFail
  | LoginRequest
  | LoginSuccess
  | LoginFail
  | LogoutRequest
  | LogoutSuccess
  | LogoutFail;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const registerAction = (payload: {
  email: string;
  password: string;
}) => async (dispatch: Dispatch) => {
  dispatch({
    type: authTypes.REGISTER_REQUEST,
  });
  axios({
    method: "post",
    url: "/register",
    data: payload,
  })
    .then((response) => {
      const { data } = response.data;
      dispatch({
        type: authTypes.REGISTER_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: authTypes.REGISTER_FAILURE,
        payload: error.message,
      });
    });
};

export const loginAction = (payload: {
  email: string;
  password: string;
}) => async (dispatch: Dispatch) => {
  dispatch({
    type: authTypes.LOG_IN_REQUEST,
  });
  axios({
    method: "post",
    url: "/login",
    data: payload,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
    },
  })
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem("USER-TOKEN", token);

      dispatch({
        type: authTypes.LOG_IN_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: authTypes.LOG_IN_FAILURE,
        payload: error.message,
      });
    });
};

export const logoutAction = () => async (dispatch: Dispatch) => {
  dispatch({
    type: authTypes.LOG_OUT_REQUEST,
  });
  localStorage.clear();

  if (localStorage.getItem("USER_TOKEN")) {
    dispatch({
      type: authTypes.LOG_OUT_FAILURE,
      payload: "logout error",
    });
  } else {
    dispatch({
      type: authTypes.LOG_OUT_SUCCESS,
    });
  }
};

export const loadUserAction = () => async (dispatch: Dispatch) => {
  // let x = tokenConfig(getState).headers["x-auth-token"];
  // if (x === undefined) {
  //   return;
  // }
  // dispatch({
  //   type: authTypes.USER_LOADING,
  // });
  // try {
  //   const response: AxiosResponse<ReservationInterface> = await axios.get(
  //     `${url}/user/getReservations/${userId}`
  //   );
  //   console.log("response.data");
  //   console.log(response.data);
  //   dispatch({
  //     type: userTypes.GET_USER_RESERVATIONS_SUCCESS,
  //     payload: response.data,
  //   });
  // } catch (error) {
  //   console.log(error.message);
  //   dispatch({
  //     type: userTypes.GET_USER_RESERVATIONS_FAIL,
  //   });
  // }
};
