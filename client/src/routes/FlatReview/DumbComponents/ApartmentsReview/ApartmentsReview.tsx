import React from "react";
import { BsStarFill } from "react-icons/bs";
//Style
import classes from "./apartmentsReview.module.scss";
//Icons
import doubleBed from "../../../../assets/images/double.png";
//Interface
import { PropertyInterface } from "../../../../store/types/propertyInterfaces";
//Components
import ReserveNightsForm from "../ReserveNights/ReserveNightsForm";
import PropertiesType from "../../../components/PropertyType/PropertiesType";
import MainInformation from "../../../components/MainInformation/MainInformation";
import Ratings from "../../../components/Ratings/Ratings";

interface FlatProps {
  property: PropertyInterface;
}

const ApartmentsReview = (props: FlatProps) => {
  return (
    <div className={classes.Content}>
      <div className={classes.Layer}>
        <div>
          <PropertiesType active={true}>{props.property.title}</PropertiesType>
          <p className={classes.TextSmall}>
            <MainInformation
              active={true}
              facilities={props.property.facilities}
            />
          </p>
        </div>
        <div>
          <button className={classes.BtnSaveShare}>Share</button>
          <button className={classes.BtnSaveShare}>Save</button>
        </div>
      </div>
      <Ratings
        active={true}
        overallRating={props.property.overallRating}
        ratingsCount={props.property.ratingsCount}
      />

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
          <div className={classes.BookingLayerMargin}>
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
