import { fchmod } from "fs";
import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import "@material-ui/pickers";
import { TextField, Select } from "@material-ui/core";
import classes from "./reserveNightsForm.module.scss";

interface ReservNights {}

const ReserveNightsForm: FC<ReservNights> = (): any => {
  console.log({ TextField }, "textsadkjaghsdkjashgdkjagshdkjh");
  const [startDate, setStartDate] = useState(new Date());
  const handleDateChange = (date: any) => {
    setStartDate(date);
  };
  const [endDate, setEndtDate] = useState(new Date());

  return (
    <>
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
      </MuiPickersUtilsProvider> */}
      {/* <DatePicker
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
      /> */}
      <div>
        <div className={classes.Selection}>
          <form className={classes.Form}>
            <TextField
              id="date"
              label="Check In"
              type="date"
              defaultValue="2021-09-02"
              classes={{
                root: classes.TextField,
                
                // FormLabel: classes.text,
                // rail: classes.asd,
                // formControl: classes.SmallText;
              }}
              InputProps={{
                className: classes.asd,
                classes: {
                  root: classes.bbd,
                  // underline: "none",
                },
              }}
            />
            {console.log(TextField)}
            <TextField
              id="date"
              label="Check In"
              type="date"
              defaultValue="2021-09-02"
              classes={{
                root: classes.TextField,
              }}
            />
          </form>
          <Select className={classes.Select} />
        </div>
        <div>
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
        <div className={classes.TotalPrice}>
          <span>Total</span>
          <span>200$</span>
        </div>
      </div>
    </>
  );
};
export default ReserveNightsForm;
