// import update from "react-addons-update";

import propertyTypes from "../types/propertyTypes";
import { PropertyInterface } from "../types/propertyInterfaces";
import lockTypes from "../types/lockTypes";
import { Actions } from "../actions/propertyActions";
import { LockActions } from "../actions/lockActions";

export interface LockState {
  properties: Array<PropertyInterface>;
  error: string;
}

const initialState: LockState = {
  properties: [] as Array<PropertyInterface>,
  error: "",
};

const propertyReducer = (
  state = initialState,
  action: Actions | LockActions
) => {
  switch (action.type) {
    case propertyTypes.GET_ALL_PROPERTIES_SUCCESS:
    case propertyTypes.GET_PROPERTIES_WO_LOCKS_SUCCESS:
      return {
        ...state,
        properties: action.payload,
      };
    case propertyTypes.GET_PROPERTY_SUCCESS:
      return {
        ...state,
        properties: [action.payload],
      };
    case lockTypes.ASSIGN_LOCK_SUCCESS:
    case lockTypes.UNASSIGN_LOCK_SUCCESS:
      return {
        ...state,
        properties: action.payload.properties,
      };
    case propertyTypes.GET_ALL_PROPERTIES_FAIL:
    case propertyTypes.GET_PROPERTIES_WO_LOCKS_FAIL:
    case propertyTypes.GET_PROPERTY_FAIL:
    case propertyTypes.THROW_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case propertyTypes.CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default propertyReducer;
