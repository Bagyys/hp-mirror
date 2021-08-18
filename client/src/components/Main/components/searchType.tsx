import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsCalendar } from "../../../store/actions/mainPageActions";
import { StoreState } from "../../../store/configureStore";
import classes from "../main.module.scss";

function SearchType() {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const [numberToMove, setNumberToMove] = useState<number>(10);
  const dispatch = useDispatch();
  const switcher = (number: number) => {
    setNumberToMove(number);
    if (mainPage.isCalendar) {
      dispatch(toggleIsCalendar(false));
    } else {
      dispatch(toggleIsCalendar(true));
    }
  };

  return (
    <div className={classes.DataPicker}>
      <div onClick={() => switcher(61)} className={classes.Anytime}>
        Anytime
      </div>
      <div onClick={() => switcher(10)} className={classes.active}>
        Calendar
      </div>
      <span style={{ right: `${numberToMove}%`, top: "80%" }}></span>
    </div>
  );
}

export default SearchType;
