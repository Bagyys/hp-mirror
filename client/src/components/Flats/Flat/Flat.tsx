import classes from "./Flat.module.scss";
import ImageSlider from "../../Slider/imageSlider";
import Button from "../../Button/button";
import DiscountBadge from "../../DiscountBadge/DiscountBadge";

import likeHeart from "../../../assets/images/like_heart.png";
import likeHeartHover from "../../../assets/images/like_heart_hover.png";
import ratingStar from "../../../assets/images/rating_star.png";

import { Link } from "react-router-dom";

import { PropertyInterface } from "../../../store/types/propertyInterfaces";
import { useState } from "react";

const Flat = ({ property }: { property: PropertyInterface }) => {
  const [showBtn, setShowBtn] = useState<boolean>(false);

  const like = () => {
    alert("Successfully added to favorites");
  };

  let propertiesRender = (
    <li
      onMouseOver={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
      className={classes.Flat}
    >
      <div className={classes.FlatContent}>
        <div className={classes.FlatImg}>
          <ImageSlider slides={property.images} />
          <div onClick={like} className={classes.LikeContainer}>
            <img className={classes.Like} src={likeHeart} />
            <img className={classes.LikeHover} src={likeHeartHover} />
          </div>
          <div
            className={
              property.discount.inContent
                ? classes.BadgeInContent
                : classes.BadgeInImage
            }
          >
            {property.discount.more1Week && (
              <DiscountBadge
                badge={property.discount.badgeColor}
                badgeHover="Badge5"
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
                badgeHover="Badge20"
                title="When book one month or more"
              >
                20
              </DiscountBadge>
            )}
          </div>
        </div>
        <div className={classes.InfoContainer}>
          <div className={classes.Info}>
            <div className={classes.RatingsContainer}>
              <div className={classes.Ratings}>
                <img src={ratingStar} />
                <span>{property.overallRating}</span>
              </div>
              <div className={classes.Reviews}>
                ( <span>{property.ratingsCount} </span>
                reviews )
              </div>
            </div>
            <p className={classes.ApartamentType}>{property.type}</p>
            <p className={classes.AdditionalInfo}>
              {property.facilities.beds
                ? `${property.facilities.beds} beds`
                : null}
              {property.facilities.kitchen ? " • kitchen" : null}
              {` • ${property.facilities.bathroomType} bath`}
              {property.facilities.wifi ? " • WIFI" : null}
              {property.facilities.parking ? " • parking" : null}
            </p>
            <div className={classes.PriceBtnContainer}>
              <div className={classes.PriceContainer}>
                <p className={classes.Price}>
                  <span>{property.price.daily}€</span>/night
                </p>
                <p className={classes.TotalPrice}>244€ total</p>
              </div>
              <Button btnType={"FlatInfo"} show={showBtn}>
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
