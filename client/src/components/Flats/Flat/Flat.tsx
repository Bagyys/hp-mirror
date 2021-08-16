import classes from './Flat.module.scss';
import ImageSlider from '../../Slider/imageSlider';
import Button from '../../Button/button';
import DiscountBadge from './DiscountBadge/DiscountBadge';
import Ratings from './Ratings/Ratings';
import PropertyType from './PropertyType/PropertiesType';
import MainInformation from './MainInformation/MainInformation';
import Prices from './Prices/Prices';
import likeHeart from '../../../assets/images/like_heart.png';
import likeHeartHover from '../../../assets/images/like_heart_hover.png';
import { Link } from 'react-router-dom';

import { PropertyInterface } from '../../../store/types/propertyInterfaces';
import { useState } from 'react';
interface FlatProps {
  property: PropertyInterface;
  hide?: boolean | null;
  clicked?: () => void;
}
const Flat: React.FC<FlatProps> = (props) => {
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const like = () => {
    alert('Successfully added to favorites');
  };
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
          <div onClick={like} className={classes.LikeContainer}>
            <img className={classes.Like} src={likeHeart} />
            <img className={classes.LikeHover} src={likeHeartHover} />
          </div>
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
        </div>
        <div className={classes.InfoContainer}>
          <div className={classes.Info}>
            <Ratings
              overallRating={props.property.overallRating}
              ratingsCount={props.property.ratingsCount}
            />
            <PropertyType type={props.property.type} />
            <MainInformation facilities={props.property.facilities} />
            <div className={classes.PriceBtnContainer}>
              <Prices price={props.property.price.daily} />
              <Button
                clicked={props.clicked}
                btnType={'FlatInfo'}
                show={showBtn}
              >
                Quick View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
  return <>{propertiesRender}</>;
};

export default Flat;
