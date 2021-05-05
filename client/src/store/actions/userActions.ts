import { Action, Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";
// import moment from "moment-timezone";
// import Swal from "sweetalert2";

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

export interface UserLoading extends Action<typeof userTypes.USER_LOADING> {}

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
  | UserLoading
  | RegisterRequest
  | RegisterSuccess
  | RegisterFail
  | LoginRequest
  | LoginSuccess
  | LoginFail
  | LogoutRequest
  | LogoutSuccess
  | LogoutFail
  | VerifyRequest
  | VerifySuccess
  | VerifyFail
  | GetUserReservationsStart
  | GetUserReservationsSuccess
  | GetUserReservationsFail;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const registerAction = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  console.log("registerAction");
  console.log("email");
  console.log(email);
  console.log("password");
  console.log(password);
  dispatch({
    type: userTypes.REGISTER_REQUEST,
  });
  const body = { email, password };
  try {
    const response: AxiosResponse<{
      token: string;
      user: UserInterface;
    }> = await axios.post(`${url}/user/register`, body);
    // console.log("response");
    // console.log(response);
    // const { data } = response;
    // console.log("data");
    // console.log(data);
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

  // axios({
  //   method: "post",
  //   url: "/user/register",
  //   data: { email, password },
  // })
  //   .then((response) => {
  //     const { data } = response.data;
  //     console.log("data");
  //     console.log(data);
  //     dispatch({
  //       type: userTypes.REGISTER_SUCCESS,
  //       payload: data,
  //     });
  //   })
  //   .catch((error) => {
  //     dispatch({
  //       type: userTypes.REGISTER_FAILURE,
  //       payload: error.message,
  //     });
  //   });
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
      Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
    },
  })
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem("USER-TOKEN", token);

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

  if (localStorage.getItem("USER_TOKEN")) {
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

export const sendVerificationAction = ({ email, userLanguage }: any) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: userTypes.SEND_VERIFICATION_REQUEST,
  });
  const body = {
    email,
    userLanguage,
  };
  axios
    .put(`${url}/user/send-verify`, body)
    .then((res) => {
      // dispatch(returnSuccess(res.data.msg, res.status, "SENDVERIFY_SUCCESS"));
      dispatch({
        type: userTypes.SEND_VERIFICATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(
      //   returnErrors(err.response.data, err.response.status, "SENDVERIFY_FAIL")
      // );
      dispatch({
        type: userTypes.SEND_VERIFICATION_FAIL,
        payload: err.message,
      });
    });
};

export const verifyAction = (params: string, userLanguage: string) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: userTypes.VERIFY_REQUEST,
  });
  const body = {
    userLanguage,
    params,
  };
  axios
    .put(`${url}/user/verify/${params}`, body)
    .then((res) => {
      // dispatch(returnSuccess(res.data, res.status, "VERIFY_FAIL"));
      dispatch({
        type: userTypes.VERIFY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(
      //   returnErrors(err.response.data, err.response.status, "VERIFY_FAIL")
      // );
      dispatch({
        type: userTypes.VERIFY_FAIL,
        payload: err.message,
      });
    });
};

export const getUserReservationsAction = (userId: string) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: userTypes.GET_USER_RESERVATIONS_START,
  });
  try {
    const response: AxiosResponse<ReservationInterface> = await axios.get(
      `${url}/user/getReservations/${userId}`
    );
    console.log("response.data");
    console.log(response.data);
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
