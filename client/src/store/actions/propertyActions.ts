import { Action, Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";

import propertyTypes from "../types/propertyTypes";
import errorTypes from "../types/errorTypes";
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
  extends Action<typeof propertyTypes.GET_ALL_PROPERTIES_FAIL> {}

export interface GetPropertieswoLocksStart
  extends Action<typeof propertyTypes.GET_PROPERTIES_WO_LOCKS_START> {}

export interface GetPropertieswoLocksSuccess
  extends Action<typeof propertyTypes.GET_PROPERTIES_WO_LOCKS_SUCCESS> {
  payload: Array<PropertyInterface>;
}

export interface GetPropertieswoLocksFail
  extends Action<typeof propertyTypes.GET_PROPERTIES_WO_LOCKS_FAIL> {}

export interface GetPropertyStart
  extends Action<typeof propertyTypes.GET_PROPERTY_START> {}

export interface GetPropertySuccess
  extends Action<typeof propertyTypes.GET_PROPERTY_SUCCESS> {
  payload: PropertyInterface;
}

export interface GetPropertyFail
  extends Action<typeof propertyTypes.GET_PROPERTY_FAIL> {}

export interface SelectProperty
  extends Action<typeof propertyTypes.SELECT_PROPERTY> {
  payload: string;
}

export interface ClearSelectedProperty
  extends Action<typeof propertyTypes.CLEAR_SELECTED_PROPERTY> {}

export type PropertyActions =
  | GetAllPropertiesStart
  | GetAllPropertiesSuccess
  | GetAllPropertiesFail
  | GetPropertieswoLocksStart
  | GetPropertieswoLocksSuccess
  | GetPropertieswoLocksFail
  | GetPropertyStart
  | GetPropertySuccess
  | GetPropertyFail
  | SelectProperty
  | ClearSelectedProperty;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const getAllPropertiesAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: propertyTypes.GET_ALL_PROPERTIES_START });
  try {
    const response: AxiosResponse<{
      properties: Array<PropertyInterface>;
      message: string;
    }> = await axios.get(`${url}/property/getAllProperties`);
    if (
      response.status === 200 &&
      response.data.message === undefined &&
      response.data.properties !== undefined
    ) {
      dispatch({
        type: propertyTypes.GET_ALL_PROPERTIES_SUCCESS,
        payload: response.data.properties,
      });
    } else {
      dispatch({
        type: propertyTypes.GET_ALL_PROPERTIES_FAIL,
      });
      dispatch({
        type: errorTypes.THROW_ERROR,
        payload: response.data.message,
      });
    }
  } catch (err) {
    dispatch({
      type: propertyTypes.GET_ALL_PROPERTIES_FAIL,
    });
    dispatch({
      type: errorTypes.THROW_ERROR,
      payload: err.message,
    });
  }
};

// TODO: currently not used. Check later if it will become usefull. If not, delete
export const getPropertieswoLocksAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: propertyTypes.GET_PROPERTIES_WO_LOCKS_START });
  try {
    const response: AxiosResponse<{
      properties: Array<PropertyInterface>;
      message: string;
    }> = await axios.get(`${url}/property/getPropertieswoLocks`);
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
      const response: AxiosResponse<{
        property: PropertyInterface;
        message: string;
      }> = await axios.get(`${url}/property/getOneProperty/${propertyId}`);
      if (
        response.status === 200 &&
        response.data.message === undefined &&
        response.data.property !== undefined
      ) {
        dispatch({
          type: propertyTypes.GET_PROPERTY_SUCCESS,
          payload: response.data.property,
        });
      } else {
        dispatch({
          type: propertyTypes.GET_PROPERTY_FAIL,
        });
        dispatch({
          type: errorTypes.THROW_ERROR,
          payload: response.data.message,
        });
      }
    } catch (err) {
      dispatch({
        type: propertyTypes.GET_PROPERTY_FAIL,
      });
      dispatch({
        type: errorTypes.THROW_ERROR,
        payload: err.message,
      });
    }
  };

export const selectPropertyAction =
  (id: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: propertyTypes.SELECT_PROPERTY,
      payload: id,
    });
  };

export const clearSelectedPropertyAction = () => async (dispatch: Dispatch) => {
  dispatch({
    type: propertyTypes.CLEAR_SELECTED_PROPERTY,
  });
};

// -------------------- END of ACTIONS --------------------
