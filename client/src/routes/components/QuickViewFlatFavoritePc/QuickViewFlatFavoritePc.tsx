import { PropertyInterface } from '../../../store/types/propertyInterfaces';
import classes from './QuickViewFlatFavoritePc.module.scss';
import { useMediaPredicate } from 'react-media-hook';
import ImageSlider from '../ImageSlider/ImageSlider';
import Favorites from '../../../routes/components/Favorites/Favorites';
import Ratings from '../../../routes/components/Ratings/Ratings';
import PropertiesType from '../../../routes/components/PropertyType/PropertiesType';
import MainInformation from '../../../routes/components/MainInformation/MainInformation';
import Badge from '../Badge/Badge';
import InformationWithIcons from '../../../routes/components/InformationWithIcons/InformationWithIcons';
import AboutPlace from '../../../routes/components/AboutPlace/AboutPlace';
import DailyPrice from '../../../routes/components/DailyPrices/DailyPrice';
import { Link } from 'react-router-dom';
import Button from '../Button/button';
import React from 'react';
interface QuickViewFlatProps {
  property: PropertyInterface;
  close: () => void;
  isMain: boolean;
  liked: boolean;
  clickedLike: () => void;
}
const QuickViewFlatFavoritePc: React.FC<QuickViewFlatProps> = (props) => {
  return (
    <>
      <li className={classes.QuickViewPcContainer}>
        <div className={classes.SliderContainer}>
          <ImageSlider
            sliderClass="QuickViewFlatFavorite"
            slides={props.property.images}
          />
          <Favorites liked={props.liked} clickedLike={props.clickedLike} />
        </div>
        <div className={classes.InfoContainer}>
          <Ratings
            overallRating={props.property.overallRating}
            ratingsCount={props.property.ratingsCount}
          />
          <PropertiesType>{props.property.title}</PropertiesType>
          <MainInformation facilities={props.property.facilities} />
          <div className={classes.AboutPlaceContainer}>
            <AboutPlace>{props.property.description}</AboutPlace>
          </div>
        </div>
        <div className={classes.ExtraInformationContainer}>
          <Badge badge="BadgeDiscountLong">
            Discount available on long term
          </Badge>
          <Badge badge="BadgeCancelation">Free cancelation until July 6</Badge>
          <InformationWithIcons facilities={props.property.facilities} />
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
              <Button btnType={'FlatInfo'} bgColor="Blue">
                Read all details and Reserve
              </Button>
            </Link>
          </div>
        </div>
      </li>
      <li></li>
      <li></li>
    </>
  );
};
export default QuickViewFlatFavoritePc;
