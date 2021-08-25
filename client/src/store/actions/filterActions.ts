import { Action, Dispatch } from "redux";
import filterTypes from "../types/filterTypes";
import { PriceInterface,ApartamentInfoInterface,RoomsBedsInterface } from "../types/filterInterface";

// -------------------- URLS --------------------

const url = process.env.REACT_APP_SERVER_URL;
// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------
export interface ChangeFilterPrice
  extends Action<typeof filterTypes.CHANGE_FILTER_PRICE> {
      payload: PriceInterface;
  }
export interface ChangeFilterRoomsBeds
  extends Action<typeof filterTypes.CHANGE_FILTER_BEDS_ROOMS> {
      payload: RoomsBedsInterface;
  }
export interface ChangeFilterPropertyType
    extends Action<typeof filterTypes.CHANGE_FILTER_PROPERTY_TYPE> {
        payload: ApartamentInfoInterface;
    }
export interface ChangeFilterHouseRules
    extends Action<typeof filterTypes.CHANGE_FILTER_HOUSE_RULES> {
        payload: ApartamentInfoInterface;
    }    
export interface ChangeFilterAmenities
    extends Action<typeof filterTypes.CHANGE_FILTER_AMENITIES> {
        payload: ApartamentInfoInterface;
    }
export interface ChangeFilterFacilities
    extends Action<typeof filterTypes.CHANGE_FILTER_FACILITIES> {
        payload: ApartamentInfoInterface;
    } 
export interface ChangeFilterAreas
    extends Action<typeof filterTypes.CHANGE_FILTER_AREAS> {
        payload: ApartamentInfoInterface;
    }          
export interface ToggleFilterButton
  extends Action<typeof filterTypes.TOGGLE_FILTER_BUTTON> {
      payload: boolean;
  }
export interface ClearFilter
  extends Action<typeof filterTypes.CLEAR_FILTER> {
  }
export interface TogglePropertyTypesInputs
  extends Action<typeof filterTypes.TOGGLE_PROPERT_TYPE_INPUTS> {
      payload:boolean;
  } 
export interface ToggleHouseRulesInputs
  extends Action<typeof filterTypes.TOGGLE_HOUSE_RULES_INPUTS> {
      payload:boolean;
  }
export interface TogglAmenitiesInputs
  extends Action<typeof filterTypes.TOGGLE_AMENITIES_INPUTS> {
      payload:boolean;
  } 
export interface ToggleFacilitiesInputs
  extends Action<typeof filterTypes.TOGGLE_FACILITIES_INPUTS> {
      payload:boolean;
  }  
export interface ToggleAreasInputs
  extends Action<typeof filterTypes.TOGGLE_AREAS_INPUTS> {
      payload:boolean;
  }   


export type FilterActions =
  | ToggleFilterButton
  | ChangeFilterRoomsBeds
  | ChangeFilterPrice
  | ChangeFilterPropertyType
  | ChangeFilterHouseRules
  | ChangeFilterAmenities
  | ChangeFilterFacilities
  | ChangeFilterAreas
  | ClearFilter
  | TogglePropertyTypesInputs
  | ToggleHouseRulesInputs
  | TogglAmenitiesInputs
  | ToggleFacilitiesInputs
  | ToggleAreasInputs
 
  ;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------
export const changeFilterPriceAction = (priceData:PriceInterface) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.CHANGE_FILTER_PRICE,
      payload:priceData
  })
};

export const changeFilterBedsRoomsAction = (bedsRoomsData:RoomsBedsInterface) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.CHANGE_FILTER_BEDS_ROOMS,
      payload:bedsRoomsData
  })
};

export const changeFilterPropertyTypeAction = (propertyType:ApartamentInfoInterface) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.CHANGE_FILTER_PROPERTY_TYPE,
      payload:propertyType
  })
};

export const changeFilterHouseRulesAction = (houseRules:ApartamentInfoInterface) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.CHANGE_FILTER_HOUSE_RULES,
      payload:houseRules
  })
};

export const changeFilterAmenitiesAction = (amenities:ApartamentInfoInterface) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.CHANGE_FILTER_AMENITIES,
      payload:amenities
  })
};

export const changeFilterFacilitiesAction = (facilities:ApartamentInfoInterface) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.CHANGE_FILTER_FACILITIES,
      payload:facilities
  })
};

export const changeFilterAreasAction = (areas:ApartamentInfoInterface) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.CHANGE_FILTER_AREAS,
      payload:areas
  })
};

export const toggleFilterButtonAction = (isOpen:boolean) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.TOGGLE_FILTER_BUTTON,
      payload:isOpen
  })
};

export const clearFilterAction = () => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.CLEAR_FILTER
  })
};

export const togglePropertyTypeAction = (show:boolean) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.TOGGLE_PROPERT_TYPE_INPUTS,
      payload:show
  })
};
export const toggleHouseRulesAction = (show:boolean) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.TOGGLE_HOUSE_RULES_INPUTS,
      payload:show
  })
};
export const toggleAmenitiesAction = (show:boolean) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.TOGGLE_AMENITIES_INPUTS,
      payload:show
  })
};
export const toggleFacilitiesAction = (show:boolean) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.TOGGLE_FACILITIES_INPUTS,
      payload:show
  })
};
export const toggleAreasAction = (show:boolean) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.TOGGLE_AREAS_INPUTS,
      payload:show
  })
};
