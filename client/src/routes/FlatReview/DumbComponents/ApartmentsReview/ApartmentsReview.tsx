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
import AboutPlace from "../../../components/AboutPlace/AboutPlace";
import DailyPrice from "../../../components/DailyPrices/DailyPrice";

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

      <AboutPlace>{props.property.description}</AboutPlace>
      <div className={classes.BookingPurchaseForm}>
        <div className={classes.BookingLayer}>
          <div className={classes.BookingLayerMargin}>
            <DailyPrice price={props.property.price.daily} active={true} />
          </div>
          <ReserveNightsForm />
        </div>
      </div>
    </div>
  );
};
export default ApartmentsReview;
