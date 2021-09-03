import React from "react";
import { BsStarFill } from "react-icons/bs";
//Style
import classes from "./apartmentsReview.module.scss";
//Icons
import doubleBed from "../../../../assets/images/double.png";
//Components
import ReserveNightsForm from "../ReserveNights/ReserveNightsForm";

const ApartmentsReview = () => {
  return (
    <div className={classes.Content}>
      <div className={classes.Layer}>
        <div>
          <p className={classes.Text}>Studio apartments in city center!</p>
          <p className={classes.TextSmall}>
            3 guest 2 beds 1 private bath Wifi
          </p>
        </div>
        <div>
          <button className={classes.BtnSaveShare}>Share</button>
          <button className={classes.BtnSaveShare}>Save</button>
        </div>
      </div>
      <div className={classes.StarRating}>
        <BsStarFill size="2.6em" color="#4886ff" />
        <span className={classes.RatingNumber}>4.75 </span>
        <span className={classes.Reviews}>(7 Reviews) </span>
      </div>

      <div>
        <div className={classes.Icons}>
          <div>
            <img src={doubleBed} alt="img" />
            <p>1 Double bed</p>
          </div>
          <div>
            <img src={doubleBed} alt="img" />
            <p>1 Double bed</p>
          </div>
          <div>
            <img src={doubleBed} alt="img" />
            <p>1 Double bed</p>
          </div>
          <div>
            <img src={doubleBed} alt="img" />
            <p>1 Double bed</p>
          </div>
          <div>
            <img src={doubleBed} alt="img" />
            <p>1 Double bed</p>
          </div>
        </div>
      </div>
      <div className={classes.AboutLayer}>
        <h4 className={classes.AboutPlace}>About the place</h4>
        <p className={classes.AboutDescription}>
          Studio apartment with a prival bathroom with of Hamburg equipped with
          all the amenities. An apartment is bright with a large window, a newly
          renovated bathroom and two panoramic terrace with sunbeds.
        </p>
      </div>
      <div className={classes.BookingPurchaseForm}>
        <div className={classes.BookingLayer}>
          <div>
            <span className={classes.BookingPrice}>41$</span>
            <span className={classes.BookingNights}>/nights</span>
          </div>
          <ReserveNightsForm />
        </div>
      </div>
    </div>
  );
};
export default ApartmentsReview;
