import { Action, Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";
// import moment from "moment-timezone";
// import Swal from "sweetalert2";
import { StoreState } from "../configureStore";
import userTypes from "../types/userTypes";
import { ReservationInterface } from "../types/reservationInterfaces";
import { UserInterface } from "../types/userInterfaces";

// -------------------- URLS --------------------
// development URL
const url = process.env.REACT_APP_DEV_URL;

// production URL
// const url = process.env.REACT_APP_PROD_URL;
// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------

export interface LoadUserRequest
  extends Action<typeof userTypes.LOAD_USER_REQUEST> {}

export interface LoadUserSuccess
  extends Action<typeof userTypes.LOAD_USER_SUCCESS> {
  payload: UserInterface;
}

export interface LoadUserFail extends Action<typeof userTypes.LOAD_USER_FAIL> {
  payload: string;
}
export interface RegisterRequest
  extends Action<typeof userTypes.REGISTER_REQUEST> {}

export interface RegisterSuccess
  extends Action<typeof userTypes.REGISTER_SUCCESS> {
  payload: { token: string; user: UserInterface };
}

export interface RegisterFail
  extends Action<typeof userTypes.REGISTER_FAILURE> {
  payload: string;
}

export interface LoginRequest extends Action<typeof userTypes.LOG_IN_REQUEST> {}

export interface LoginSuccess extends Action<typeof userTypes.LOG_IN_SUCCESS> {
  payload: { token: string; user: UserInterface };
}

export interface LoginFail extends Action<typeof userTypes.LOG_IN_FAILURE> {
  payload: string;
}

export interface LogoutRequest
  extends Action<typeof userTypes.LOG_OUT_REQUEST> {}

export interface LogoutSuccess
  extends Action<typeof userTypes.LOG_OUT_SUCCESS> {}

export interface LogoutFail extends Action<typeof userTypes.LOG_OUT_FAILURE> {
  payload: string;
}

export interface SendVerificationRequest
  extends Action<typeof userTypes.SEND_VERIFICATION_REQUEST> {}

export interface SendVerificationSuccess
  extends Action<typeof userTypes.SEND_VERIFICATION_SUCCESS> {
  payload: UserInterface;
}

export interface SendVerificationFail
  extends Action<typeof userTypes.SEND_VERIFICATION_FAIL> {
  payload: string;
}

export interface VerifyRequest
  extends Action<typeof userTypes.VERIFY_REQUEST> {}

export interface VerifySuccess extends Action<typeof userTypes.VERIFY_SUCCESS> {
  payload: any; // TODO: add type
}

export interface VerifyFail extends Action<typeof userTypes.VERIFY_FAIL> {
  payload: string;
}
export interface GetUserReservationsStart
  extends Action<typeof userTypes.GET_USER_RESERVATIONS_START> {}

export interface GetUserReservationsSuccess
  extends Action<typeof userTypes.GET_USER_RESERVATIONS_SUCCESS> {
  payload: Array<ReservationInterface>;
}

export interface GetUserReservationsFail
  extends Action<typeof userTypes.GET_USER_RESERVATIONS_FAIL> {
  payload: string;
}

export type Actions =
  | LoadUserRequest
  | LoadUserSuccess
  | LoadUserFail
  | RegisterRequest
  | RegisterSuccess
  | RegisterFail
  | LoginRequest
  | LoginSuccess
  | LoginFail
  | LogoutRequest
  | LogoutSuccess
  | LogoutFail
  | SendVerificationRequest
  | SendVerificationSuccess
  | SendVerificationFail
  | VerifyRequest
  | VerifySuccess
  | VerifyFail
  | GetUserReservationsStart
  | GetUserReservationsSuccess
  | GetUserReservationsFail;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const loadUser = () => async (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  dispatch({ type: userTypes.LOAD_USER_REQUEST });
  let x = tokenConfig(getState).headers["x-auth-token"];
  if (x === undefined) {
    return;
  }
  await axios
    .get(url + "/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: userTypes.LOAD_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err: Error) => {
      console.log("err.message");
      console.log(err.message);
      dispatch({
        type: userTypes.LOAD_USER_FAIL,
        payload: err.message,
      });
    });
};

export const registerAction = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: userTypes.REGISTER_REQUEST,
  });
  const body = { email, password };
  try {
    const response: AxiosResponse<{
      token: string;
      user: UserInterface;
    }> = await axios.post(`${url}/register`, body);
    localStorage.setItem("token", response.data.token);

    dispatch({
      type: userTypes.REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: userTypes.REGISTER_FAILURE,
      payload: error.message,
    });
  }
};

export const sendVerificationAction = (email: string) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: userTypes.SEND_VERIFICATION_REQUEST,
  });
  const body = {
    email,
  };
  axios
    .put(`${url}/send-verify`, body)
    .then((res) => {
      dispatch({
        type: userTypes.SEND_VERIFICATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: userTypes.SEND_VERIFICATION_FAIL,
        payload: err.message,
      });
    });
};

export const verifyAction = (params: string) => (dispatch: Dispatch) => {
  dispatch({
    type: userTypes.VERIFY_REQUEST,
  });
  const body = {
    params,
  };
  axios
    .put(`${url}/verify/${params}`, body)
    .then((res) => {
      dispatch({
        type: userTypes.VERIFY_SUCCESS,
        payload: res.data,
      });
      // TODO: cia ideti swala, kad yay viskas pavyko
    })
    .catch((err) => {
      dispatch({
        type: userTypes.VERIFY_FAIL,
        payload: err.message,
      });
    });
};

export const loginAction = (payload: {
  email: string;
  password: string;
}) => async (dispatch: Dispatch) => {
  dispatch({
    type: userTypes.LOG_IN_REQUEST,
  });
  axios({
    method: "post",
    url: "/login",
    data: payload,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem("token", token);

      dispatch({
        type: userTypes.LOG_IN_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: userTypes.LOG_IN_FAILURE,
        payload: error.message,
      });
    });
};

export const logoutAction = () => async (dispatch: Dispatch) => {
  dispatch({
    type: userTypes.LOG_OUT_REQUEST,
  });
  localStorage.clear();

  if (localStorage.getItem("token")) {
    dispatch({
      type: userTypes.LOG_OUT_FAILURE,
      payload: "logout error",
    });
  } else {
    dispatch({
      type: userTypes.LOG_OUT_SUCCESS,
    });
  }
};

export const getUserReservationsAction = (userId: string) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: userTypes.GET_USER_RESERVATIONS_START,
  });
  try {
    const response: AxiosResponse<ReservationInterface> = await axios.get(
      `${url}/getReservations/${userId}`
    );
    dispatch({
      type: userTypes.GET_USER_RESERVATIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: userTypes.GET_USER_RESERVATIONS_FAIL,
      payload: error.message,
    });
  }
};

export const tokenConfig = (getState: () => StoreState) => {
  // gets token from local storage
  const token = getState().user.token;
  // headers
  const config: {
    headers: { "content-type": string; "x-auth-token"?: string };
  } = {
    headers: {
      "content-type": "application/json",
    },
  };
  //iff token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
