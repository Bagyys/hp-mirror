import { combineReducers } from "redux";
import doorReducer from "./doorsReducer";
import { routerReducer } from "react-router-redux";
import orderReducer from "./bookingReducer";
import bookingReducer from "./bookingReducer";
const rootReducer = combineReducers({
  doors: doorReducer,
  router: routerReducer,
  booking: bookingReducer,
});

export default rootReducer;
