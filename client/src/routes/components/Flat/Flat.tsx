import classes from "./Flat.module.scss";
import ImageSlider from "../ImageSlider/ImageSlider";
import Button from "../Button/button";
import GroupedBadges from "../GroupedBadges/GroupedBadges";
import Ratings from "../Ratings/Ratings";
import Favorites from "../Favorites/Favorites";
import PropertiesType from "../PropertyType/PropertiesType";
import MainInformation from "../MainInformation/MainInformation";

import { PropertyInterface } from "../../../store/types/propertyInterfaces";
import DailyPrice from "../DailyPrices/DailyPrice";
import { cn } from "../../../utilities/joinClasses";
import React from "react";

interface FlatProps {
  property: PropertyInterface;
  liked: boolean;
  quickViewClicked?: () => void;
  clickedLike: () => void;
  isMain?: boolean;
}
const Flat: React.FC<FlatProps> = (props) => (
  <li className={cn(classes.Flat, props.isMain ? classes.FlatMain : classes.FlatFavorite)}>
    <div className={classes.FlatContent}>
      <div className={classes.FlatImg}>
        <ImageSlider sliderClass="FlatCard" slides={props.property?.images} />
        <Favorites liked={props.liked} clickedLike={props.clickedLike} />
      </div>

      <div
        className={cn(
          classes.InfoContainer,
          props.isMain ? classes.InfoContainerMain : classes.InfoContainerFavorite
        )}>
        <GroupedBadges {...props.property.discounts} />
        <Ratings
          active={false}
          
          overallRating={props.property.overallRating}
          ratingsCount={props.property.ratingsCount}
        />
        <PropertiesType active={false}>{props.property.title}</PropertiesType>

        <MainInformation
          active={false}
          facilities={props.property.facilities}
        />

        <div className={classes.PriceBtnContainer}>
          <div className={classes.PriceContainer}>
            <DailyPrice price={props.property.price.daily} />
            <p className={classes.TotalPrice}>244€ total</p>
          </div>

          <div className={classes.FlatBtnsContainer}>
            <Button clicked={props.quickViewClicked} btnType={'FlatInfo'} bgColor="Blue">
              Quick View
            </Button>
          </div>
        </div>
      </div>
    </div>
  </li>
);

export default Flat;
