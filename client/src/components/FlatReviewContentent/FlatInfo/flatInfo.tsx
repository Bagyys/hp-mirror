import React, { Component } from "react";
//Style
import classes from "./flatInfo.module.scss";
//Component
import AppartmentsRewie from "./AppartmentsReview/AppartmentsReview";
import PlaceOffers from "./PlaceOffers/PlaceOffers";
import DiscountCalendor from "./DiscountCalendor/DiscountCalendor";

const FlatInfo = () => {
  return (
    <>
      <div className={classes.Layer}>
        <AppartmentsRewie />
        <PlaceOffers />
        <DiscountCalendor />
      </div>
    </>
  );
};
export default FlatInfo;
