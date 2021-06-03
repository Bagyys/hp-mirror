// import update from "react-addons-update";

import propertyTypes from "../types/propertyTypes";
import { PropertyInterface } from "../types/propertyInterfaces";
import lockTypes from "../types/lockTypes";
import { Actions } from "../actions/propertyActions";
import { LockActions } from "../actions/lockActions";

export interface PropertyState {
  properties: Array<PropertyInterface>;
  selectedProperty: string;
  error: string;
}

const initialState: PropertyState = {
  properties: [] as Array<PropertyInterface>,
  selectedProperty: "",
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
    case propertyTypes.SELECT_PROPERTY:
      return {
        ...state,
        selectedProperty: action.payload,
      };
    case propertyTypes.CLEAR_SELECTED_PROPERTY:
      return {
        ...state,
        selectedProperty: "",
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
