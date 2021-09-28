//React
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../../store/configureStore";
import {
  setEndDateAction,
  setStartDateAction,
} from "../../../../store/actions/mainPageActions";
//Lib
import DatePicker from "react-datepicker";
import "@material-ui/pickers";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import moment from "moment";
import { DateRange, OnChangeProps } from "react-date-range";
//Style
import classes from "./reserveNightsForm.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { isTemplateExpression } from "typescript";

interface ReservNights {}

const ReserveNightsForm: FC<ReservNights> = (): any => {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const dispatch = useDispatch();
  // const [range, setRange] = useState([
  //   {
  //     startDate: moment.utc().startOf("day").toDate(),
  //     // endDate: moment.utc().add(1, "day").startOf("day").toDate(),
  //     endDate: moment.utc().startOf("day").toDate(),
  //     key: "selection",
  //   },
  // ]);
  // let handleRange = (item: any) => {
  //   dispatch(setStartDateAction(item.selection.startDate));
  //   if (item.selection.startDate !== item.selection.endDate) {
  //     dispatch(setEndDateAction(item.selection.endDate));
  //   } else {
  //     dispatch(setEndDateAction(undefined));
  //   }
  //   setRange([item.selection]);
  // };

  return (
    <>
      <div>
        <div className={classes.Selection}>
          <form action="">
            <div className={classes.Form}>
              <label htmlFor="">
                <span>Check in</span>
                <p>{moment(mainPage.startDate).calendar("MMM Do")}</p>
              </label>
              <label htmlFor="">
                <span>Check out</span>
                <p>{moment(mainPage.endDate).calendar("MMM Do")}</p>
              </label>
              {console.log(moment(), "moment3")}
            </div>
            <div className={classes.Select}>
              <label htmlFor="">Guests</label>
              <select name="Guest" id="guest">
                <option value="guests">
                  {mainPage.guests.adults + mainPage.guests.children} guests
                </option>
                {/* need dynamic option  */}
              </select>
            </div>
          </form>
        </div>
        <div>
          <div>
            {moment(mainPage.startDate).format("MMM Do")}
            {moment(mainPage.endDate).format("MMM Do")}
          </div>
          <button className={classes.ReserveBtn}>Reserve</button>
          <p className={classes.SmallText}>You won't be charget yet</p>
        </div>
        <div className={classes.ReservePaymentInfo}>
          <span>22$ x 7 nights</span>
          <span> 220$</span>
        </div>
        <div className={classes.ReservePaymentDiscountInfo}>
          <div className={classes.Layer}>
            <span className={classes.Discount}> -5%</span>
            <p>with one week booking</p>
          </div>
          <span> -20$</span>
        </div>
        <div className={classes.TotalPriceBorder}></div>
        <div className={classes.TotalPrice}>
          <span>Total</span>
          <span>200$</span>
        </div>
      </div>
    </>
  );
};
export default ReserveNightsForm;

{
  /* <MuiPickersUtilsProvider utils={DateFnsUtils}>
  <KeyboardDatePicker
  disableToolbar
  variant="inline"
  format="dd/MM/yyyy"
  margin="normal"
  id="date-picker"
  label="Check In"
  value={startDate}
  onChange={handleDateChange}
  />
  </MuiPickersUtilsProvider> */
}
{
  /* <DatePicker
  selected={startDate}
  onChange={(date: any) => setStartDate(date)}
  selectsStart
  startDate={startDate}
  endDate={endDate}
  />
  <DatePicker
  selected={endDate}
  onChange={(date: any) => setEndtDate(date)}
  selectsEnd
  startDate={startDate}
  endDate={endDate}
  minDate={startDate}
  /> */
}

// const [startDate, setStartDate] = useState(new Date());
// const handleDateChange = (date: any) => {
//   setStartDate(date);
// };
// const [endDate, setEndtDate] = useState(new Date());

{
  /* <form className={classes.Form}>
            <div className={classes.FormBorder}>
              <TextField
                id="date"
                label="Check In"
                type="date"
                defaultValue=""
                classes={{
                  root: classes.TextField1,

                  // FormLabel: classes.text,
                  // rail: classes.asd,
                  // formControl: classes.SmallText;
                }}
              />
            </div>

            <TextField
              id="date"
              label="Check Out"
              type="date"
              defaultValue="2021-09-02"
              classes={{
                root: classes.TextField,
              }}
            />
          </form> */
}
