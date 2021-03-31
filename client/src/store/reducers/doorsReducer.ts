import doorTypes from "../types/doorTypes";
// import Actions from "../actions/doorsActions";
export interface InitialState {
  Nothing: Array<String>;
}

const initialState: InitialState = {
  Nothing: [],
};

const doorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case doorTypes.INIT_DOORS:
      return {
        ...state,
        params: action.payload,
      };
    default:
      return state;
  }
};

export default doorReducer;
