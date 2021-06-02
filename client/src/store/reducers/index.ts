import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import lockReducer from "./lockReducer";
import userReducer from "./userReducer";
import bookingReducer from "./bookingReducer";
import reservationReducer from "./reservationReducer";
import propertyReducer from "./propertyReducer";

export default combineReducers({
  user: userReducer,
  lock: lockReducer,
  router: routerReducer,
  booking: bookingReducer,
  reservation: reservationReducer,
  property: propertyReducer,
});
