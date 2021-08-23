// import update from "react-addons-update";

import propertyTypes from "../types/propertyTypes";
import { PropertyInterface } from "../types/propertyInterfaces";
import lockTypes from "../types/lockTypes";
import { PropertyActions } from "../actions/propertyActions";
import { LockActions } from "../actions/lockActions";

export interface PropertyState {
  properties: Array<PropertyInterface>;
  selectedProperty: string;
  quickViewPropertyId:string;
  pageSize:number;
  currentPage:number;
}

const initialState: PropertyState = {
  properties: [] as Array<PropertyInterface>,
  selectedProperty: "",
  quickViewPropertyId:"",
  pageSize:4,
  currentPage:1
};

const propertyReducer = (
  state = initialState,
  action: PropertyActions | LockActions
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
    case propertyTypes.QUICK_VIEW_PROPERTY:
      return {
        ...state,
        quickViewPropertyId:action.payload,
      };
    case propertyTypes.PAGINATION_PAGE_SIZE:
      return {
        ...state,
        pageSize:action.payload,
      };
    case propertyTypes.PAGINATION_CURRENT_PAGE:
      return {
        ...state,
        currentPage:action.payload,
      };
    default:
      return state;
  }
};

export default propertyReducer;
