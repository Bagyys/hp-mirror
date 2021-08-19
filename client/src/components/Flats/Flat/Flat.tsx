import { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import classes from './Flat.module.scss';
import ImageSlider from '../../Slider/imageSlider';
import Button from '../../Button/button';
import DiscountBadge from './DiscountBadge/DiscountBadge';
import Ratings from './Ratings/Ratings';
import Favorites from './Favorites/Favorites';
import PropertyType from './PropertyType/PropertiesType';
import MainInformation from './MainInformation/MainInformation';
import Prices from './Prices/Prices';
import LongBadge from '../QuickViewFlat/LongBadge/LongBadge';
import { Link } from 'react-router-dom';
import { PropertyInterface } from '../../../store/types/propertyInterfaces';

interface FlatProps {
  property: PropertyInterface;
  recentlyView?: boolean;
  hide?: boolean | null;
  liked: boolean;
  clicked?: () => void;
  clickedLike: () => void;
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
      style={props.hide ? { display: 'none' } : { display: 'block' }}
    >
      <div className={classes.FlatContent}>
        <div className={classes.FlatImg}>
          <ImageSlider borders="FlatCard" slides={props.property.images} />
          <Favorites liked={props.liked} clickedLike={props.clickedLike} />
          {!isMobile && (
            <div className={classes.BadgeInContent}>
              {props.property.discount.more1Week && (
                <DiscountBadge badgeHover="Badge5" title="When book one week">
                  -5%
                </DiscountBadge>
              )}
              {props.property.discount.more1Month && (
                <DiscountBadge
                  badgeHover="Badge20"
                  title="When book one month or more"
                >
                  -20%
                </DiscountBadge>
              )}
            </div>
          )}
        </div>
        <div
          onClick={props.mobileClickHandler}
          className={classes.InfoContainer}
        >
          <div className={classes.Info}>
            <Ratings
              overallRating={props.property.overallRating}
              ratingsCount={props.property.ratingsCount}
            />
            <PropertyType>{props.property.type}</PropertyType>
            {!isMobile && (
              <MainInformation facilities={props.property.facilities} />
            )}

            {isMobile && (
              <p className={classes.Area}>
                {props.property.location.district} area
              </p>
            )}

            <div className={classes.PriceBtnContainer}>
              {isMobile && (
                <div className={classes.BadgeContainer}>
                  <LongBadge badge="BadgeDiscount">-5%</LongBadge>
                  <p>long term</p>
                </div>
              )}
              <Prices price={props.property.price.daily} />
              {props.recentlyView ? (
                <Button btnType={'FlatInfo'} show={showBtn}>
                  <Link
                    to={{
                      pathname: `/flat/${props.property._id}`,
                      state: { property: props.property },
                    }}
                  >
                    View
                  </Link>
                </Button>
              ) : (
                <Button
                  clicked={props.clicked}
                  btnType={'FlatInfo'}
                  show={showBtn}
                >
                  Quick View
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
  return <>{propertiesRender}</>;
};

export default Flat;
