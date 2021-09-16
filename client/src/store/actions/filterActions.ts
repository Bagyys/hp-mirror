import { Action, Dispatch } from "redux";
import filterTypes from "../types/filterTypes";
import { PriceInterface,ApartamentInfoInterface,RoomsBedsInterface, FormDataInterface } from "../types/filterInterface";

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
export interface ChangeFilterInputs
    extends Action<typeof filterTypes.CHANGE_FILTER_INPUT_VALUES> {
        payload: {[key:string]:ApartamentInfoInterface|RoomsBedsInterface|PriceInterface};
    }
export interface ToggleFilterButton
  extends Action<typeof filterTypes.TOGGLE_FILTER_BUTTON> {
      payload: boolean;
  }
export interface ClearFilter
  extends Action<typeof filterTypes.CLEAR_FILTER> {
  }

export interface ToggleCheckboxesList
  extends Action<typeof filterTypes.TOGGLE_CHECKBOXES_LIST> {
      payload:{[key:string]:boolean};
  }

export interface AddFormData
  extends Action<typeof filterTypes.ADD_FORM_DATA> {
      payload:FormDataInterface;
  }    


export type FilterActions =
  | ToggleFilterButton
  | ChangeFilterRoomsBeds
  | ChangeFilterPrice
  | ChangeFilterInputs
  | ClearFilter
  | ToggleCheckboxesList
  | AddFormData
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

export const changeFilterInputsAction = (inputValues:ApartamentInfoInterface|RoomsBedsInterface|PriceInterface,mainId:string) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.CHANGE_FILTER_INPUT_VALUES,
      payload:{[mainId]:inputValues}
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
export const toggleCheckboxesListAction = (show:boolean,id:string) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.TOGGLE_CHECKBOXES_LIST,
      payload:{[id]:show}
  })
};

export const addFormDataAction = (formData:FormDataInterface) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.ADD_FORM_DATA,
      payload:formData
  })
};
