import classes from './QuickViewFlat.module.scss';
import ImageSlider from '../../Slider/imageSlider';
import Button from '../../Button/button';
import { useMediaPredicate } from 'react-media-hook';
import Badge from '../../Badge/Badge';
import Ratings from '../Flat/Ratings/Ratings';
import PropertiesType from '../Flat/PropertyType/PropertiesType';
import MainInformation from '../Flat/MainInformation/MainInformation';
import DailyPrice from '../Flat/DailyPrices/DailyPrice';
import AboutPlace from './AboutPlace/AboutPlace';
import InformationWithIcons from './InformationWithIcons/InformationWithIcons';
import { PropertyInterface } from '../../../store/types/propertyInterfaces';
import GroupedBadges from '../Flat/GroupedBadges/GroupedBadges';
import { Link } from 'react-router-dom';
import React from 'react';
interface QuickViewFlatProps {
  property: PropertyInterface;
  close: () => void;
}

const QuickViewFlat: React.FC<QuickViewFlatProps> = (props) => {
  const isMobile = useMediaPredicate('(max-width: 675px)');
  return (
    <li className={classes.QuickViewFlatContainer}>
      <div className={classes.SliderWithInfoContainer}>
        <ImageSlider borders="QuickView" slides={props.property.images} />
        <div className={classes.InfoContainer}>
          <Ratings
            overallRating={props.property.overallRating}
            ratingsCount={props.property.ratingsCount}
          />
          <PropertiesType>{props.property.type}</PropertiesType>
          {isMobile ? (
            <GroupedBadges {...props.property.discount} />
          ) : (
            <MainInformation facilities={props.property.facilities} />
          )}
        </div>
      </div>
      <div className={classes.ExtraInformationContainer}>
        {!isMobile && (
          <React.Fragment>
            <Badge badge="BadgeDiscountLongOrShort">
              Discount available on long term
            </Badge>
            <Badge badge="BadgeCancelationOrDate">
              Free cancelation until July 6
            </Badge>
          </React.Fragment>
        )}

        <InformationWithIcons facilities={props.property.facilities} />
      </div>
      <div className={classes.AboutPlaceContainer}>
        <AboutPlace>{props.property.description}</AboutPlace>
      </div>
      <div className={classes.PriceBtnContainer}>
        <div className={classes.PriceContainer}>
          <DailyPrice price={props.property.price.daily} />
          <p className={classes.TotalPrice}>244€ total</p>
        </div>
        <div className={classes.BtnsContainer}>
          <p className={classes.Close} onClick={props.close}>
            Close
          </p>
          <Link
            to={{
              pathname: `/flat/${props.property._id}`,
              state: { property: props.property },
            }}
          >
            <Button btnType={'FlatInfo'}>Read all details and Reserve</Button>
          </Link>
        </div>
      </div>
    </li>
  );
};
export default QuickViewFlat;
