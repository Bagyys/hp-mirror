import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleIsCalendar,
  toggleIsSearching,
} from "../../../store/actions/mainPageActions";
import { StoreState } from "../../../store/configureStore";
import classes from "../main.module.scss";

function AnytimeIsGood() {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const dispatch = useDispatch();
  const isCalendarShowed = () => {
    if (mainPage.isCalendar) {
      dispatch(toggleIsCalendar(false));
    } else if (!mainPage.isSearching) {
      dispatch(toggleIsCalendar(true));
    }

    if (mainPage.isSearching) {
      dispatch(toggleIsSearching(false));
    } else {
      dispatch(toggleIsSearching(true));
    }
  };

  return (
    <div onClick={() => isCalendarShowed()} className={classes.AnyTimeIsGood}>
      Anytime is good &gt;
    </div>
  );
}

export default AnytimeIsGood;
