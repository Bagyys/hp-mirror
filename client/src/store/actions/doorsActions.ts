import { Action } from "redux";
import doorTypes from "../types/doorTypes";
import { Dispatch } from "redux";
import axios from "axios";
export interface GetQuery extends Action<typeof doorTypes.INIT_DOORS> {
  payload: string;
}

export type Actions = GetQuery;

// const devUrl = "http://localhost:9000";
const prodUrl = "http://18.195.50.192:9000";
export const getDoorQuery = (arg: string) => async (dispatch: Dispatch) => {
  try {
    const responseData: any = await axios.put(
      `${prodUrl}/doorSwitch1/?h=A3%nm*Wb&id=Lg18299RHS10MxSh&${arg}=1`
    );
    dispatch({
      type: doorTypes.INIT_DOORS,
      payload: responseData.data.door,
    });
  } catch (err) {
    console.log("Erroras");
  }
};
export const resetDoor = () => async (dispatch: Dispatch) => {
  try {
    const responseData: any = await axios.put(`${prodUrl}/reset/`);
    // dispatch({
    //   type: doorTypes.INIT_DOORS,
    //   payload: responseData.data.door,
    // });
  } catch (err) {
    console.log("Erroras");
  }
};
