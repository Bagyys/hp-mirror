import React, { Component } from "react";
//Style
import classes from "./flatInfo.module.scss";
//Component
import AppartmentsRewie from "../FlatInfo/ApartmentsReview/ApartmentsReview";
import PlaceOffers from "./PlaceOffers/PlaceOffers";
import DiscountCalendor from "./DiscountCalendor/DiscountCalendor";
import CommentsSection from "./CommentsSection/CommentsSection";
import Location from "./Location/Location";
const FlatInfo = () => {
  return (
    <>
      <div className={classes.Layer}>
        <AppartmentsRewie />
        <PlaceOffers />
        <DiscountCalendor />
        <CommentsSection />
        <Location />
      </div>
    </>
  );
};
export default FlatInfo;
