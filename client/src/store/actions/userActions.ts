import { Action, Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";

import { StoreState } from "../configureStore";
import userTypes from "../types/userTypes";
import { userState } from "../reducers/userReducer";
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
  payload: { user: UserInterface };
}

export interface LoadUserFail extends Action<typeof userTypes.LOAD_USER_FAIL> {
  payload: { message: string };
}
export interface RegisterRequest
  extends Action<typeof userTypes.REGISTER_REQUEST> {}

export interface RegisterSuccess
  extends Action<typeof userTypes.REGISTER_SUCCESS> {
  payload: { token: string; user: UserInterface };
}

export interface RegisterFail
  extends Action<typeof userTypes.REGISTER_FAILURE> {
  payload: { message: string };
}

export interface LoginRequest extends Action<typeof userTypes.LOG_IN_REQUEST> {}

export interface LoginSuccess extends Action<typeof userTypes.LOG_IN_SUCCESS> {
  payload: { token: string; user: UserInterface };
}

export interface LoginFail extends Action<typeof userTypes.LOG_IN_FAILURE> {
  payload: { message: string };
}

export interface LogoutRequest
  extends Action<typeof userTypes.LOG_OUT_REQUEST> {}

export interface LogoutSuccess
  extends Action<typeof userTypes.LOG_OUT_SUCCESS> {}

export interface LogoutFail extends Action<typeof userTypes.LOG_OUT_FAILURE> {
  payload: { message: string };
}

export interface SendVerificationRequest
  extends Action<typeof userTypes.SEND_VERIFICATION_REQUEST> {}

export interface SendVerificationSuccess
  extends Action<typeof userTypes.SEND_VERIFICATION_SUCCESS> {
  payload: { user: UserInterface };
}

export interface SendVerificationFail
  extends Action<typeof userTypes.SEND_VERIFICATION_FAIL> {
  payload: { message: string };
}

export interface VerifyRequest
  extends Action<typeof userTypes.VERIFY_REQUEST> {}

export interface VerifySuccess extends Action<typeof userTypes.VERIFY_SUCCESS> {
  payload: { user: UserInterface };
}

export interface VerifyFail extends Action<typeof userTypes.VERIFY_FAIL> {
  payload: { message: string };
}

export interface ClearError extends Action<typeof userTypes.CLEAR_ERROR> {}

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
  | ClearError;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const loadUser =
  () => async (dispatch: Dispatch, getState: () => StoreState) => {
    dispatch({ type: userTypes.LOAD_USER_REQUEST });
    const user: userState = getState().user;
    const currentUser = user.currentUser;

    if (currentUser !== null && typeof currentUser !== "string") {
      const body = { userId: currentUser._id };
      try {
        const response = await axios.post(url + "/", body);
        if (response.status === 200 && response.data.message === undefined) {
          dispatch({
            type: userTypes.LOAD_USER_SUCCESS,
            payload: response.data,
          });
        } else {
          dispatch({
            type: userTypes.LOAD_USER_FAIL,
            payload: response.data.message,
          });
        }
      } catch (error) {
        dispatch({
          type: userTypes.LOAD_USER_FAIL,
          payload: error.message,
        });
      }
    }
  };

export const registerAction =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: userTypes.REGISTER_REQUEST,
    });
    const body = { email, password };
    try {
      const response: AxiosResponse<{
        token: string;
        user: UserInterface;
        message?: string;
      }> = await axios.post(`${url}/register`, body);

      if (response.status === 200 && response.data.message === undefined) {
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: userTypes.REGISTER_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: userTypes.REGISTER_FAILURE,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: userTypes.REGISTER_FAILURE,
        payload: error.message,
      });
    }
  };

export const sendVerificationAction =
  (email: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: userTypes.SEND_VERIFICATION_REQUEST,
    });
    const body = {
      email,
    };

    try {
      const response = await axios.put(`${url}/send-verify`, body);
      if (response.status === 200 && response.data.message === undefined) {
        dispatch({
          type: userTypes.SEND_VERIFICATION_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: userTypes.SEND_VERIFICATION_FAIL,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: userTypes.SEND_VERIFICATION_FAIL,
        payload: error.message,
      });
    }
  };

export const verifyAction = (params: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: userTypes.VERIFY_REQUEST,
  });
  const body = {
    params,
  };

  try {
    const response = await axios.put(`${url}/verify/${params}`, body);
    if (response.status === 200 && response.data.message === undefined) {
      dispatch({
        type: userTypes.VERIFY_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: userTypes.VERIFY_FAIL,
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: userTypes.VERIFY_FAIL,
      payload: error.message,
    });
  }
};

export const loginAction =
  (payload: { email: string; password: string }) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: userTypes.LOG_IN_REQUEST,
    });
    axios({
      method: "post",
      url: `${url}/login`,
      data: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200 && response.data.message === undefined) {
          const { token } = response.data;
          localStorage.setItem("token", token);
          dispatch({
            type: userTypes.LOG_IN_SUCCESS,
            payload: response.data,
          });
        } else {
          dispatch({
            type: userTypes.LOG_IN_FAILURE,
            payload: response.data.message,
          });
        }
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

export const tokenConfig = (getState: () => StoreState) => {
  // gets token from local storage
  const user: userState = getState().user;
  const token = user.token;
  // headers
  const config: {
    headers: { "content-type": string; "x-auth-token"?: string };
  } = {
    headers: {
      "content-type": "application/json",
    },
  };
  //if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};

export const clearErrorAction = () => async (dispatch: Dispatch) => {
  dispatch({
    type: userTypes.CLEAR_ERROR,
  });
};
