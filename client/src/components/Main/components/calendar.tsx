import classes from "../main.module.scss";
import { useState } from "react";
import { DateRange, OnChangeProps } from "react-date-range";
import {
  setStartDateAction,
  setEndDateAction,
} from "../../../store/actions/mainPageActions";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../store/configureStore";
import { useMediaPredicate } from "react-media-hook";
import MobileButton from "./Buttons/mobileButton";

function Calendar() {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const isMobile = useMediaPredicate("(max-width: 675px)");
  const isLaptop = useMediaPredicate("(max-width: 1660px)");
  const dispatch = useDispatch();
  const [range, setRange] = useState([
    {
      startDate: moment.utc().startOf("day").toDate(),
      // endDate: moment.utc().add(1, "day").startOf("day").toDate(),
      endDate: moment.utc().startOf("day").toDate(),
      key: "selection",
    },
  ]);

  const handleRange = (item: any) => {
    // TODO: solve typescript conflict
    dispatch(setStartDateAction(item.selection.startDate));
    if (item.selection.startDate !== item.selection.endDate) {
      dispatch(setEndDateAction(item.selection.endDate));
    } else {
      dispatch(setEndDateAction(undefined));
    }
    setRange([item.selection]);
  };
  return (
    <div className={classes.Calendar}>
      <DateRange
        minDate={new Date()}
        editableDateInputs={true}
        onChange={(range: OnChangeProps) => {
          handleRange(range);
          //  setRange([range.selection as CustomRange]) // Typescript conflict
        }}
        moveRangeOnFirstSelection={false}
        ranges={range}
        weekStartsOn={1}
        weekdayDisplayFormat="EEEEEE"
        showMonthAndYearPickers={false}
        months={isLaptop ? 1 : 2}
        direction="horizontal"
        monthDisplayFormat="MMMM yyyy"
      />
      {isLaptop ? <MobileButton /> : null}
    </div>
  );
}

export default Calendar;
