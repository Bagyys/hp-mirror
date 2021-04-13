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
    console.log("Erroras");
    dispatch({
      type: propertyTypes.GET_ALL_PROPERTIES_FAIL,
    });
  }
};

export const getOnePropertyAction = (propertyId: string) => async (
  dispatch: Dispatch
) => {
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
    console.log("Erroras");
    dispatch({
      type: propertyTypes.GET_PROPERTY_FAIL,
    });
  }
};
// -------------------- END of ACTIONS --------------------
