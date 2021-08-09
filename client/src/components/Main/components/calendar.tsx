import classes from "../main.module.scss";
import { useEffect, useState } from "react";
import { DateRange, OnChangeProps } from "react-date-range";
import {
  setStartDateAction,
  setEndDateAction,
  setProceedToGuests,
} from "../../../store/actions/mainPageActions";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../store/configureStore";

function Calendar() {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const dispatch = useDispatch();
  const [range, setRange] = useState([
    {
      // startDate: moment.utc().startOf("day").toDate(),
      // endDate: moment.utc().add(1, "day").startOf("day").toDate(),
      key: "selection",
    },
  ]);
  useEffect(() => {
    if (mainPage.startDate && mainPage.endDate) {
      dispatch(setProceedToGuests(true));
    }
  }, [mainPage.startDate, mainPage.endDate]);

  const hourlyCheckArray: Array<Date> = [];

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
        disabledDates={hourlyCheckArray}
        weekStartsOn={1}
        weekdayDisplayFormat="EEEEEE"
        showMonthAndYearPickers={false}
        months={2}
        direction="horizontal"
        monthDisplayFormat="MMMM yyyy"
      />
    </div>
  );
}

export default Calendar;
