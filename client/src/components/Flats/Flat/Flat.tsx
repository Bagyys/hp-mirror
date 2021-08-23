import { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import classes from './Flat.module.scss';
import ImageSlider from '../../Slider/imageSlider';
import Button from '../../Button/button';
import Area from './Area/Area';
import Badge from '../../Badge/Badge';
import Ratings from './Ratings/Ratings';
import Favorites from './Favorites/Favorites';
import PropertyType from './PropertyType/PropertiesType';
import MainInformation from './MainInformation/MainInformation';
import { Link } from 'react-router-dom';
import { PropertyInterface } from '../../../store/types/propertyInterfaces';
import DailyPrice from './DailyPrices/DailyPrice';

interface FlatProps {
  property: PropertyInterface;
  favoritePage?: boolean;
  recentlyView?: boolean;
  liked?: boolean;
  quickViewClicked?: () => void;
  clickedLike?: () => void;
  mobileClickHandler?: () => void;
}
const Flat: React.FC<FlatProps> = (props) => {
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const isMobile = useMediaPredicate('(max-width: 675px)');

  let propertiesRender = (
    <li
      onMouseOver={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
      className={classes.Flat}
    >
      <div className={classes.FlatContent}>
        <div className={classes.FlatImg}>
          <ImageSlider borders="FlatCard" slides={props.property.images} />
          <Favorites liked={props.liked} clickedLike={props.clickedLike} />
          {!isMobile && (
            <div className={classes.BadgeInContent}>
              {props.property.discount.more1Week && (
                <Badge badge="Badge5" title="When book one week">
                  -5%
                </Badge>
              )}
              {props.property.discount.more1Month && (
                <Badge badge="Badge20" title="When book one month or more">
                  -20%
                </Badge>
              )}
            </div>
          )}
        </div>
        <div
          onClick={isMobile ? props.mobileClickHandler : undefined}
          className={classes.InfoContainer}
        >
          <div className={classes.Info}>
            <Ratings
              overallRating={props.property.overallRating}
              ratingsCount={props.property.ratingsCount}
            />
            <PropertyType>{props.property.type}</PropertyType>

            {isMobile ? (
              <Area district={props.property.location.district} />
            ) : (
              <MainInformation facilities={props.property.facilities} />
            )}

            <div className={classes.PriceBtnContainer}>
              {isMobile &&
                (props.favoritePage ? (
                  <div className={classes.BadgeContainer}>
                    <Badge badge="BadgeCancelationOrDate">Oct 3-31</Badge>
                  </div>
                ) : (
                  <div className={classes.BadgeContainer}>
                    <Badge badge="BadgeDiscountLongOrShort">-5%</Badge>
                    <p>long term</p>
                  </div>
                ))}
              <div className={classes.PriceContainer}>
                <DailyPrice
                  priceClass="Price"
                  price={props.property.price.daily}
                />
                <p className={classes.TotalPrice}>244€ total</p>
              </div>
              {!isMobile &&
                (props.recentlyView ? (
                  <Link
                    to={{
                      pathname: `/flat/${props.property._id}`,
                      state: { property: props.property },
                    }}
                  >
                    <Button btnType={'FlatInfo'} show={showBtn}>
                      View
                    </Button>
                  </Link>
                ) : (
                  <Button
                    clicked={props.quickViewClicked}
                    btnType={'FlatInfo'}
                    show={showBtn}
                  >
                    Quick View
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
  return <>{propertiesRender}</>;
};

export default Flat;
