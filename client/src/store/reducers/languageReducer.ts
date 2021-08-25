import languageTypes from "../types/languageTypes";
import { LanguageActions } from "../actions/languageActions";
export interface LanguageState {
  languages:{[key:string]:string};
  selected:string;
}

const initialState: LanguageState = {
  languages:{
      en:"EN",
      lt:"LT",
      ru:"RU"
  },
  selected:"EN"
};

const languageReducer = (state = initialState, action: LanguageActions) => {
  switch (action.type) {
    case languageTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        selected: action.payload
      };
    
    default:
      return state;
  }
};

export default languageReducer;
