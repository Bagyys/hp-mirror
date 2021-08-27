import { useMediaPredicate } from "react-media-hook";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAnytimeOrCalendar,
  toggleIsCalendar,
  toggleIsSearching,
} from "../../../store/actions/mainPageActions";
import { StoreState } from "../../../store/configureStore";
import classes from "../main.module.scss";

function AnytimeIsGood() {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const isMobile = useMediaPredicate("(max-width: 675px)");
  const dispatch = useDispatch();
  const isCalendarShowed = () => {
    dispatch(toggleAnytimeOrCalendar("anytime"));
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
      {isMobile ? "Anytime" : `Anytime is good`}
    </div>
  );
}

export default AnytimeIsGood;
