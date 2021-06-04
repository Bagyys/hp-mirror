import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import lockReducer from "./lockReducer";
import userReducer from "./userReducer";
import bookingReducer from "./bookingReducer";
import errorReducer from "./errorReducer";
import reservationReducer from "./reservationReducer";
import propertyReducer from "./propertyReducer";

export default combineReducers({
  booking: bookingReducer,
  error: errorReducer,
  lock: lockReducer,
  reservation: reservationReducer,
  router: routerReducer,
  property: propertyReducer,
  user: userReducer,
});
