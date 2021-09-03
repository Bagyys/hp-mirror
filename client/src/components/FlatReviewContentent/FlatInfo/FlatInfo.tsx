import React, { Component } from "react";
//Style
import classes from "./flatInfo.module.scss";
//Component
import ApartmentsReview from "./ApartmentsReview/ApartmentsReview";
import PlaceOffers from "./PlaceOffers/PlaceOffers";
import DiscountCalendor from "./DiscountCalendor/DiscountCalendor";

const FlatInfo = () => {
  return (
    <>
      <div className={classes.Layer}>
        <ApartmentsReview />
        <PlaceOffers />
        <DiscountCalendor />
      </div>
    </>
  );
};
export default FlatInfo;
