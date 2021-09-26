import { Action, Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";
import propertyTypes from "../types/propertyTypes";
import errorTypes from "../types/errorTypes";
import { PropertyInterface } from "../types/propertyInterfaces";
import { availableProperties} from "../../utilities/flatsFunctions";

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

export interface QuickViewProperty
  extends Action<typeof propertyTypes.QUICK_VIEW_PROPERTY> {
  payload: string;
}
export interface PaginationPageSize
  extends Action<typeof propertyTypes.PAGINATION_PAGE_SIZE> {
  payload: number;
}
export interface PaginationCurrentPage
  extends Action<typeof propertyTypes.PAGINATION_CURRENT_PAGE> {
  payload: number;
}
export interface ActivePropertyCords
  extends Action<typeof propertyTypes.ADD_ACTIVE_PROPERTY_CORDS> {
  payload: { lat: number; lng: number };
}
export interface AddRecentlyViewed
  extends Action<typeof propertyTypes.ADD_RECENTLY_VIEWED> {
  payload: string;
}
export interface ResetPropertyCords
  extends Action<typeof propertyTypes.RESET_PROPERTY_CORDS> {
}
export interface MyBookingQuickViewProperty
  extends Action<typeof propertyTypes.MY_BOOKING_QUICK_VIEW_PROPERTY> {
  payload: string;
}

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
  | ClearSelectedProperty
  | QuickViewProperty
  | PaginationPageSize
  | PaginationCurrentPage
  | ActivePropertyCords
  | AddRecentlyViewed
  | ResetPropertyCords
  | MyBookingQuickViewProperty;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------

export const getAllPropertiesAction = (days:Array<string>,guests:{[key:string]:number},formData:any) => async (dispatch: Dispatch) => {
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
      //is karto filtruoja ar butai laisvi ir atitinka gyventoju skaiciu paemus duomenis is API, taip pat cia filtruojami sideFilter duomenys, nezinau ar tinka?
      let available=availableProperties(response.data.properties,days,guests,formData)
      dispatch({
        type: propertyTypes.GET_ALL_PROPERTIES_SUCCESS,
        // payload: fakeData //fake data demo
        payload: available,
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
    // dispatch({
    //   type: errorTypes.THROW_ERROR,
    //   payload: err.message,
    // });
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
    // dispatch({
    //   type: propertyTypes.GET_PROPERTIES_WO_LOCKS_FAIL,
    //   payload: err.message,
    // });
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
      // dispatch({
      //   type: errorTypes.THROW_ERROR,
      //   payload: err.message,
      // });
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

export const quickViewAction = (id: string) => (dispatch: Dispatch) => {
  dispatch({
    type: propertyTypes.QUICK_VIEW_PROPERTY,
    payload: id,
  });
};

export const myBookingQuickViewAction = (id: string) => (dispatch: Dispatch) => {
  dispatch({
    type: propertyTypes.MY_BOOKING_QUICK_VIEW_PROPERTY,
    payload: id,
  });
};

export const pageSizeAction = (size: number) => (dispatch: Dispatch) => {
  dispatch({
    type: propertyTypes.PAGINATION_PAGE_SIZE,
    payload: size,
  });
};

export const currentPageAction = (page: number) => (dispatch: Dispatch) => {
  dispatch({
    type: propertyTypes.PAGINATION_CURRENT_PAGE,
    payload: page,
  });
};

export const activePropertyCordsAction =
  (cords: { lat: number; lng: number }) => (dispatch: Dispatch) => {
    dispatch({
      type: propertyTypes.ADD_ACTIVE_PROPERTY_CORDS,
      payload: cords,
    });
  };

export const addRecentlyViewedAction =
  (properties: {[key:string]:Array<string>}) =>
  (dispatch: Dispatch) => {
    dispatch({
      type: propertyTypes.ADD_RECENTLY_VIEWED,
      payload: properties,
    });
  };
  
export const resetPropertyCordsAction =
  () => (dispatch: Dispatch) => {
    dispatch({
      type: propertyTypes.RESET_PROPERTY_CORDS
    });
  };



// -------------------- END of ACTIONS --------------------
