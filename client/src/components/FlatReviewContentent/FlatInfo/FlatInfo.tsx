import React, { Component, useEffect } from 'react';
//Style
import classes from './flatInfo.module.scss';
import classes1 from '../../Flats/Flat/Flat.module.scss';
import classes2 from '../../../components/Flats/flats.module.scss';
//Component
import AppartmentsRewie from '../FlatInfo/ApartmentsReview/ApartmentsReview';
import PlaceOffers from './PlaceOffers/PlaceOffers';
import DiscountCalendor from './DiscountCalendor/DiscountCalendor';
import CommentsSection from './CommentsSection/CommentsSection';
import Location from './Location/Location';
import ThingsToKnow from './ThingsToKnow/ThingsToKnow';
import ChooseFlats from './ChooseFlats/ChooseFlats';
import PropertiesType from '../../../routes/components/PropertyType/PropertiesType';
import Footer from '../../../components/Footer/Footer';
import { PropertyInterface } from '../../../store/types/propertyInterfaces';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPropertiesAction } from '../../../store/actions/propertyActions';
import { StoreState } from '../../../store/configureStore';
import Flat from '../../../routes/components/Flat/Flat';
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
        <Footer />
      </div>
    </>
  );
};
export default FlatInfo;
