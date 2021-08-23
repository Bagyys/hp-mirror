import { Action, Dispatch } from "redux";
import filterTypes from "../types/filterTypes";
import { FilterDataInterface } from "../types/filterInterface";

// -------------------- URLS --------------------

const url = process.env.REACT_APP_SERVER_URL;
// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------
export interface ChangeFilterPrice
  extends Action<typeof filterTypes.CHANGE_FILTER_PRICE> {
      payload: {min:number,max:number};
  }

export interface ChangeFilterData
  extends Action<typeof filterTypes.CHANGE_FILTER_BEDS_ROOMS> {
      payload: {[key: string]: { value: number; text: string }};
  }

export interface ToggleFilterButton
  extends Action<typeof filterTypes.TOGGLE_FILTER_BUTTON> {
      payload: boolean;
  }


export type FilterActions =
  | ToggleFilterButton
  | ChangeFilterData
  | ChangeFilterPrice;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------
export const changeFilterPriceAction = (priceData:{min:number,max:number}) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.CHANGE_FILTER_PRICE,
      payload:priceData
  })
};

export const changeFilterBedsRoomsAction = (filterData:{[key: string]: { value: number; text: string }}) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.CHANGE_FILTER_BEDS_ROOMS,
      payload:filterData
  })
};

export const toggleFilterButtonAction = (isOpen:boolean) => (dispatch: Dispatch) => {
  dispatch({
      type:filterTypes.TOGGLE_FILTER_BUTTON,
      payload:isOpen
  })
};