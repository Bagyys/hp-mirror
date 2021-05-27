import { Action, Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";

import propertyTypes from "../types/propertyTypes";
import { PropertyProps } from "../reducers/propertyReducer";

// -------------------- URLS --------------------
// development URL
const url = process.env.REACT_APP_DEV_URL;

// production URL
// const url = process.env.REACT_APP_PROD_URL;
// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------
export interface GetAllPropertiesStart
  extends Action<typeof propertyTypes.GET_ALL_PROPERTIES_START> {}

export interface GetAllPropertiesSuccess
  extends Action<typeof propertyTypes.GET_ALL_PROPERTIES_SUCCESS> {
  payload: Array<PropertyProps>;
}

export interface GetAllPropertiesFail
  extends Action<typeof propertyTypes.GET_ALL_PROPERTIES_FAIL> {
  payload: string;
}

export interface GetPropertieswoLocksStart
  extends Action<typeof propertyTypes.GET_PROPERTIES_WO_LOCKS_START> {}

export interface GetPropertieswoLocksSuccess
  extends Action<typeof propertyTypes.GET_PROPERTIES_WO_LOCKS_SUCCESS> {
  payload: Array<PropertyProps>;
}

export interface GetPropertieswoLocksFail
  extends Action<typeof propertyTypes.GET_PROPERTIES_WO_LOCKS_FAIL> {
  payload: string;
}

export interface GetPropertyStart
  extends Action<typeof propertyTypes.GET_PROPERTY_START> {}

export interface GetPropertySuccess
  extends Action<typeof propertyTypes.GET_PROPERTY_SUCCESS> {
  payload: PropertyProps;
}

export interface GetPropertyFail
  extends Action<typeof propertyTypes.GET_PROPERTY_FAIL> {
  payload: string;
}

export type Actions =
  | GetAllPropertiesStart
  | GetAllPropertiesSuccess
  | GetAllPropertiesFail
  | GetPropertieswoLocksStart
  | GetPropertieswoLocksSuccess
  | GetPropertieswoLocksFail
  | GetPropertyStart
  | GetPropertySuccess
  | GetPropertyFail;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const getAllPropertiesAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: propertyTypes.GET_ALL_PROPERTIES_START });
  try {
    const response: AxiosResponse<Array<PropertyProps>> = await axios.get(
      `${url}/property/getAllProperties`
    );
    dispatch({
      type: propertyTypes.GET_ALL_PROPERTIES_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: propertyTypes.GET_ALL_PROPERTIES_FAIL,
      payload: err.message,
    });
  }
};

export const getPropertieswoLocksAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: propertyTypes.GET_PROPERTIES_WO_LOCKS_START });
  try {
    const response: AxiosResponse<Array<PropertyProps>> = await axios.get(
      `${url}/property/getPropertieswoLocks`
    );
    dispatch({
      type: propertyTypes.GET_PROPERTIES_WO_LOCKS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: propertyTypes.GET_PROPERTIES_WO_LOCKS_FAIL,
      payload: err.message,
    });
  }
};

export const getOnePropertyAction =
  (propertyId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: propertyTypes.GET_PROPERTY_START });
    try {
      const response: AxiosResponse<PropertyProps> = await axios.get(
        `${url}/property/getOneProperty/${propertyId}`
      );
      dispatch({
        type: propertyTypes.GET_PROPERTY_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: propertyTypes.GET_PROPERTY_FAIL,
        payload: err.message,
      });
    }
  };
// -------------------- END of ACTIONS --------------------
