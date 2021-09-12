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
  pageSizeMain:number;
  pageSizeFavorite:number;
  currentPage:number;
  activePropertyCord:{lat:number,lng:number};
  recentlyViewedProperties:Array<string>;
}

const initialState: PropertyState = {
  properties: [] as Array<PropertyInterface>,
  selectedProperty: "",
  quickViewPropertyId:"",
  pageSizeMain:4,
  pageSizeFavorite:12,
  currentPage:1,
  activePropertyCord:{lat: 54.687157,
    lng: 25.279652,},
  recentlyViewedProperties:[] as Array<string>
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
        pageSizeMain:action.payload,
      };
    case propertyTypes.PAGINATION_CURRENT_PAGE:
      return {
        ...state,
        currentPage:action.payload,
      };
    case propertyTypes.ADD_ACTIVE_PROPERTY_CORDS:
      return {
        ...state,
        activePropertyCord:action.payload,
      };  
    case propertyTypes.ADD_RECENTLY_VIEWED:
      return {
        ...state,
        recentlyViewedProperties:action.payload,
      };  
    case propertyTypes.RESET_PROPERTY_CORDS:
      return {
        ...state,
        activePropertyCord:initialState.activePropertyCord,
      }; 
    default:
      return state;
  }
};

export default propertyReducer;
