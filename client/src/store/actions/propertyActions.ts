import { Action, Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";

import propertyTypes from "../types/propertyTypes";
import { PropertyInterface } from "../types/propertyInterfaces";

// -------------------- URLS --------------------

const url = process.env.REACT_APP_SERVER_URL;

// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------
export interface GetAllPropertiesStart
  extends Action<typeof propertyTypes.GET_ALL_PROPERTIES_START> {}

export interface GetAllPropertiesSuccess
  extends Action<typeof propertyTypes.GET_ALL_PROPERTIES_SUCCESS> {
  payload: Array<PropertyInterface>;
}

export interface GetAllPropertiesFail
  extends Action<typeof propertyTypes.GET_ALL_PROPERTIES_FAIL> {
  payload: string;
}

export interface GetPropertieswoLocksStart
  extends Action<typeof propertyTypes.GET_PROPERTIES_WO_LOCKS_START> {}

export interface GetPropertieswoLocksSuccess
  extends Action<typeof propertyTypes.GET_PROPERTIES_WO_LOCKS_SUCCESS> {
  payload: Array<PropertyInterface>;
}

export interface GetPropertieswoLocksFail
  extends Action<typeof propertyTypes.GET_PROPERTIES_WO_LOCKS_FAIL> {
  payload: string;
}

export interface GetPropertyStart
  extends Action<typeof propertyTypes.GET_PROPERTY_START> {}

export interface GetPropertySuccess
  extends Action<typeof propertyTypes.GET_PROPERTY_SUCCESS> {
  payload: PropertyInterface;
}

export interface GetPropertyFail
  extends Action<typeof propertyTypes.GET_PROPERTY_FAIL> {
  payload: string;
}

export interface ThrowError extends Action<typeof propertyTypes.THROW_ERROR> {
  payload: string;
}

export interface ClearError extends Action<typeof propertyTypes.CLEAR_ERROR> {}

export type Actions =
  | GetAllPropertiesStart
  | GetAllPropertiesSuccess
  | GetAllPropertiesFail
  | GetPropertieswoLocksStart
  | GetPropertieswoLocksSuccess
  | GetPropertieswoLocksFail
  | GetPropertyStart
  | GetPropertySuccess
  | GetPropertyFail
  | ThrowError
  | ClearError;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const getAllPropertiesAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: propertyTypes.GET_ALL_PROPERTIES_START });
  try {
    const response: AxiosResponse<Array<PropertyInterface>> = await axios.get(
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
    const response: AxiosResponse<Array<PropertyInterface>> = await axios.get(
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
      const response: AxiosResponse<PropertyInterface> = await axios.get(
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
