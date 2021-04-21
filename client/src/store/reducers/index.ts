import { combineReducers } from "redux";
import lockReducer from "./lockReducer";
import { routerReducer } from "react-router-redux";
import bookingReducer from "./bookingReducer";
import propertyReducer from "./propertyReducer";

const rootReducer = combineReducers({
  lock: lockReducer,
  router: routerReducer,
  booking: bookingReducer,
  properties: propertyReducer,
});

export default rootReducer;
