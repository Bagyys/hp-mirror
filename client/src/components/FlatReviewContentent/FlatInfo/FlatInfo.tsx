import React, { Component } from "react";
//Style
import classes from "./flatInfo.module.scss";
//Component
import AppartmentsRewie from "../FlatInfo/ApartmentsReview/ApartmentsReview";
import PlaceOffers from "./PlaceOffers/PlaceOffers";
import DiscountCalendor from "./DiscountCalendor/DiscountCalendor";
import CommentsSection from "./CommentsSection/CommentsSection";
import Location from "./Location/Location";
import ThingsToKnow from "./ThingsToKnow/ThingsToKnow";
import ChooseFlats from "./ChooseFlats/ChooseFlats";
import PropertiesType from "../../Flats/Flat/PropertyType/PropertiesType";
import Footer from "../../../components/Footer/Footer";
const FlatInfo = () => {
  const properties: any = [];
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
        {properties.map((property: any) => {
          <ChooseFlats property={property} />;
        })}
        <Footer />
      </div>
    </>
  );
};
export default FlatInfo;
