import classes from './Flat.module.scss';
import Slider from '../../Slider/imageSlider';
import Button from '../../Button/button';
import DiscountBadge from '../../DiscountBadge/DiscountBadge';

import newImg from '../../../assets/images/flash.png';
import likeHeart from '../../../assets/images/like_heart.png';
import likeHeartHover from '../../../assets/images/like_heart_hover.png';
import ratingStar from '../../../assets/images/rating_star.png';

import { Link } from 'react-router-dom';

import { PropertyInterface } from '../../../store/types/propertyInterfaces';
import { useState } from 'react';

const Flat = ({ property }: { property: PropertyInterface }) => {
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const boxNew = (
    <div className={classes.NEW}>
      <img src={newImg} alt="New!" />
      <p>New</p>
    </div>
  );
  const like = () => {
    alert('Successfully added to favorites');
  };

  let propertiesRender = (
    <li
      onMouseOver={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
      className={classes.flat}
    >
      <div className={classes.flatContent}>
        <div className={classes.flatImg}>
          <Slider slides={property.images} />
          <div onClick={like} className={classes.likeContainer}>
            <img className={classes.like} src={likeHeart} />
            <img className={classes.likeHover} src={likeHeartHover} />
          </div>
          <div
            className={
              property.discount.inContent
                ? classes.badgeInContent
                : classes.badgeInImage
            }
          >
            {property.discount.more1Week && (
              <DiscountBadge
                badge={property.discount.badgeColor}
                badgeHover="badge5"
                inContent={property.discount.inContent}
                title="When book one week"
              >
                5
              </DiscountBadge>
            )}
            {property.discount.more1Month && (
              <DiscountBadge
                badge={property.discount.badgeColor}
                inContent={property.discount.inContent}
                badgeHover="badge20"
                title="When book one month or more"
              >
                20
              </DiscountBadge>
            )}
          </div>
        </div>
        <div className={classes.infoContainer}>
          <div className={classes.info}>
            <div className={classes.ratingsContainer}>
              <div className={classes.ratings}>
                <img src={ratingStar} />
                <span>{property.overallRating}</span>
              </div>
              <div className={classes.reviews}>
                ( <span>{property.ratingsCount} </span>
                reviews )
              </div>
            </div>
            <p className={classes.apartamentType}>{property.type}</p>
            <p className={classes.AdditionalInfo}>
              {property.facilities.beds
                ? `${property.facilities.beds} beds`
                : null}
              {property.facilities.kitchen ? ' • kitchen' : null}
              {` • ${property.facilities.bathroomType} bath`}
              {property.facilities.wifi ? ' • WIFI' : null}
              {property.facilities.parking ? ' • parking' : null}
            </p>
            <div className={classes.priceBtnContainer}>
              <div className={classes.priceContainer}>
                <p className={classes.price}>
                  <span>{property.price.daily}€</span>/night
                </p>
                <p className={classes.totalPrice}>244€ total</p>
              </div>
              <Button btnType={'flatInfo'} show={showBtn}>
                {/* <Link
                  to={{
                    pathname: `/flat/${property._id}`,
                    state: { property: property },
                  }}
                >
                  Quick View
                </Link> */}
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
