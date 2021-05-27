import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import monitorReducerEnhancer from "../enhancers/monitorReducer";
import loggerMiddleware from "../middleware/logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";

export type StoreState = ReturnType<typeof reducers>;

export default function configureStore(preloadedState?: {}) {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];

  // const composedEnhancers = compose(...enhancers);
  const composedEnhancers = composeWithDevTools(...(enhancers as any));

  const store = createStore(reducers, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(reducers));
  }

  return store;
}
