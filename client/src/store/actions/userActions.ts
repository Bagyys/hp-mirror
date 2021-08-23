import { Action, Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";

import { StoreState } from "../configureStore";
import userTypes from "../types/userTypes";
import errorTypes from "../types/errorTypes";
import { userState } from "../reducers/userReducer";
import { UserInterface } from "../types/userInterfaces";
import {PropertyInterface} from "../types/propertyInterfaces";
import { isStringInArray } from "../../utilities/isStringInArray";

// -------------------- URLS --------------------

const url = process.env.REACT_APP_SERVER_URL;

// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------

export interface LoadUserRequest
  extends Action<typeof userTypes.LOAD_USER_REQUEST> {}

export interface LoadUserSuccess
  extends Action<typeof userTypes.LOAD_USER_SUCCESS> {
  payload: UserInterface;
}

export interface LoadUserFail extends Action<typeof userTypes.LOAD_USER_FAIL> {}
export interface RegisterRequest
  extends Action<typeof userTypes.REGISTER_REQUEST> {}

export interface RegisterSuccess
  extends Action<typeof userTypes.REGISTER_SUCCESS> {
  payload: { token: string; user: UserInterface };
}

export interface RegisterFail
  extends Action<typeof userTypes.REGISTER_FAILURE> {}

export interface LoginRequest extends Action<typeof userTypes.LOG_IN_REQUEST> {}

export interface LoginSuccess extends Action<typeof userTypes.LOG_IN_SUCCESS> {
  payload: { token: string; user: UserInterface };
}

export interface LoginFail extends Action<typeof userTypes.LOG_IN_FAILURE> {}

export interface LogoutRequest
  extends Action<typeof userTypes.LOG_OUT_REQUEST> {}

export interface LogoutSuccess
  extends Action<typeof userTypes.LOG_OUT_SUCCESS> {}

export interface LogoutFail extends Action<typeof userTypes.LOG_OUT_FAILURE> {}

export interface SendVerificationRequest
  extends Action<typeof userTypes.SEND_VERIFICATION_REQUEST> {}

export interface SendVerificationSuccess
  extends Action<typeof userTypes.SEND_VERIFICATION_SUCCESS> {
  payload: UserInterface;
}

export interface SendVerificationFail
  extends Action<typeof userTypes.SEND_VERIFICATION_FAIL> {}

export interface VerifyRequest
  extends Action<typeof userTypes.VERIFY_REQUEST> {}

export interface VerifySuccess extends Action<typeof userTypes.VERIFY_SUCCESS> {
  payload: UserInterface;
}
//Favorites?
export interface AddToFavorite extends Action<typeof userTypes.ADD_TO_FAVORITE> {
  payload: PropertyInterface;
}

export interface VerifyFail extends Action<typeof userTypes.VERIFY_FAIL> {}

export type UserActions =
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
  | AddToFavorite;

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
        const response: AxiosResponse<{
          user: UserInterface;
          message: string;
        }> = await axios.post(url + "/", body);
        if (
          response.status === 200 &&
          response.data.message === undefined &&
          response.data.user !== undefined
        ) {
          dispatch({
            type: userTypes.LOAD_USER_SUCCESS,
            payload: response.data.user,
          });
        } else {
          dispatch({
            type: userTypes.LOAD_USER_FAIL,
          });
          dispatch({
            type: errorTypes.THROW_ERROR,
            payload: response.data.message,
          });
        }
      } catch (error) {
        dispatch({
          type: userTypes.LOAD_USER_FAIL,
        });
        dispatch({
          type: errorTypes.THROW_ERROR,
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
        message: string;
      }> = await axios.post(`${url}/register`, body);

      if (
        response.status === 200 &&
        response.data.message === undefined &&
        response.data.user !== undefined &&
        response.data.token !== undefined
      ) {
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: userTypes.REGISTER_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: userTypes.REGISTER_FAILURE,
        });
        dispatch({
          type: errorTypes.THROW_ERROR,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: userTypes.REGISTER_FAILURE,
      });
      dispatch({
        type: errorTypes.THROW_ERROR,
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
      const response: AxiosResponse<{
        user: UserInterface;
        message: string;
      }> = await axios.put(`${url}/send-verify`, body);
      if (
        response.status === 200 &&
        response.data.message === undefined &&
        response.data.user !== undefined
      ) {
        dispatch({
          type: userTypes.SEND_VERIFICATION_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: userTypes.SEND_VERIFICATION_FAIL,
        });
        dispatch({
          type: errorTypes.THROW_ERROR,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: userTypes.SEND_VERIFICATION_FAIL,
      });
      dispatch({
        type: errorTypes.THROW_ERROR,
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
    const response: AxiosResponse<{
      user: UserInterface;
      message: string;
    }> = await axios.put(`${url}/verify/${params}`, body);
    if (
      response.status === 200 &&
      response.data.message === undefined &&
      response.data.user !== undefined
    ) {
      dispatch({
        type: userTypes.VERIFY_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: userTypes.VERIFY_FAIL,
      });
      dispatch({
        type: errorTypes.THROW_ERROR,
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: userTypes.VERIFY_FAIL,
    });
    dispatch({
      type: errorTypes.THROW_ERROR,
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
      .then(
        (
          response: AxiosResponse<{
            token: string;
            user: UserInterface;
            message: string;
          }>
        ) => {
          if (
            response.status === 200 &&
            response.data.message === undefined &&
            response.data.user !== undefined &&
            response.data.token !== undefined
          ) {
            const { token } = response.data;
            localStorage.setItem("token", token);
            dispatch({
              type: userTypes.LOG_IN_SUCCESS,
              payload: response.data,
            });
          } else {
            dispatch({
              type: userTypes.LOG_IN_FAILURE,
            });
            dispatch({
              type: errorTypes.THROW_ERROR,
              payload: response.data.message,
            });
          }
        }
      )
      .catch((error) => {
        dispatch({
          type: userTypes.LOG_IN_FAILURE,
        });
        dispatch({
          type: errorTypes.THROW_ERROR,
          payload: error.message,
        });
      });
  };

export const logoutAction = () => async (dispatch: Dispatch) => {
  await dispatch({
    type: userTypes.LOG_OUT_REQUEST,
  });
  localStorage.clear();

  if (localStorage.getItem("token")) {
    dispatch({
      type: userTypes.LOG_OUT_FAILURE,
    });
    dispatch({
      type: errorTypes.THROW_ERROR,
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

export const addToFavoriteAction = (id:string,favorites:Array<string>) =>  (dispatch: Dispatch) => {
    let newArr = [...favorites];
    let isFavorites = isStringInArray(id, newArr);
    if (id) {
      isFavorites
        ? (newArr = newArr.filter((item) => item !== id))
        : newArr.push(id);
    }
  dispatch({
    type: userTypes.ADD_TO_FAVORITE,
    payload: [
      ...newArr
    ],
  });
}; 
