import React, { Component, useEffect } from "react";
//Style
import classes from "./flatInfo.module.scss";
//Component
import AppartmentsRewie from "../../../src/routes/FlatReview/DumbComponents/ApartmentsReview/ApartmentsReview";
import PlaceOffers from "../../routes/FlatReview/DumbComponents/PlaceOffers/PlaceOffers";
import DiscountCalendor from "../../routes/FlatReview/DumbComponents/DiscountCalendor/DiscountCalendor";
import CommentsSection from "../../routes/FlatReview/DumbComponents/CommentsSection/CommentsSection";
import Location from "../../routes/FlatReview/DumbComponents/Location/Location";
import ThingsToKnow from "../../routes/FlatReview/DumbComponents/ThingsToKnow/ThingsToKnow";
import ChooseFlats from "../../routes/FlatReview/DumbComponents/ChooseFlats/ChooseFlats";

const FlatInfo = (props: any) => {
  return (
    <>
      <div className={classes.Layer}>
        <AppartmentsRewie />
        <PlaceOffers />
        <DiscountCalendor />
        <CommentsSection />
        <Location />
        <ThingsToKnow />
        <ChooseFlats />
      </div>
    </>
  );
};
export default FlatInfo;
