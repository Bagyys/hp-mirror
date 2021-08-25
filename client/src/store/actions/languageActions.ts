import { Action, Dispatch } from "redux";
import languageTypes from "../types/languageTypes";

// -------------------- URLS --------------------

const url = process.env.REACT_APP_SERVER_URL;
// -------------------- END of URLS --------------------

// -------------------- ACTION INTERFACES --------------------
export interface ChangeLanguage
  extends Action<typeof languageTypes.CHANGE_LANGUAGE> {
      payload: string;
  }

export type LanguageActions =
  | ChangeLanguage
  
  ;

// -------------------- END of ACTION INTERFACES --------------------

// -------------------- ACTIONS --------------------
export const changeLanguageAction = (lang:string) => (dispatch: Dispatch) => {
  dispatch({
      type:languageTypes.CHANGE_LANGUAGE,
      payload:lang
  })
};


