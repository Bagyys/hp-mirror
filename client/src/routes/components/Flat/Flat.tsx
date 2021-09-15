import { useMediaPredicate } from 'react-media-hook';
import classes from './Flat.module.scss';
import ImageSlider from '../ImageSlider/ImageSlider';
import Button from '../Button/button';
import GroupedBadges from '../GroupedBadges/GroupedBadges';
import Ratings from '../Ratings/Ratings';
import Favorites from '../Favorites/Favorites';
import PropertiesType from '../PropertyType/PropertiesType';
import MainInformation from '../MainInformation/MainInformation';
import { Link } from 'react-router-dom';
import { PropertyInterface } from '../../../store/types/propertyInterfaces';
import DailyPrice from '../DailyPrices/DailyPrice';
import { cn } from '../../../utilities/joinClasses';

interface FlatProps {
  property: PropertyInterface;
  liked: boolean;
  quickViewClicked?: () => void;
  clickedLike: () => void;
  isMain?: boolean;
}
const Flat: React.FC<FlatProps> = (props) => {
  const isMobile = useMediaPredicate("(max-width: 675px)");
  console.log(Flat, "Flat COmponent");
  console.log(props, "Props");
  console.log(isMobile, "FLat Component isMobile?");
  console.log(useMediaPredicate, "FLat Component useMediaPredicate()");

  let propertiesRender = (
    <li
      className={cn(
        classes.Flat,
        props.isMain ? classes.FlatMain : classes.FlatFavorite
      )}
    >
      <div className={classes.FlatContent}>
        <div className={classes.FlatImg}>
          <ImageSlider sliderClass="FlatCard" slides={props.property?.images} />

          <Favorites liked={props.liked} clickedLike={props.clickedLike} />
        </div>
        <div
          className={cn(
            classes.InfoContainer,
            props.isMain
              ? classes.InfoContainerMain
              : classes.InfoContainerFavorite
          )}
        >
          <GroupedBadges {...props.property.discounts} />
          <Ratings
            overallRating={props.property.overallRating}
            ratingsCount={props.property.ratingsCount}
          />
          <PropertiesType>{props.property.title}</PropertiesType>

          <MainInformation facilities={props.property.facilities} />

          <div className={classes.PriceBtnContainer}>
            <div className={classes.PriceContainer}>
              <DailyPrice price={props.property.price.daily} />
              <p className={classes.TotalPrice}>244€ total</p>
            </div>

            <div className={classes.FlatBtnsContainer}>
              <Button
                clicked={props.quickViewClicked}
                btnType={'FlatInfo'}
                bgColor="Blue"
              >
                Quick View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
  console.log(propertiesRender, "????????????????");

  console.log(propertiesRender.props, "className????????????????");
  console.log(
    propertiesRender.props.children,
    "className Children????????????????"
  );
  console.log(
    propertiesRender.props.children.props,
    "className Children Props????????????????"
  );
  console.log(
    propertiesRender.props.children.props.children,
    "className Children Props Children????????????????"
  );

  console.log(ImageSlider, "ImageSLider");
  console.log(Favorites.propTypes, "Favorites");
  console.log(GroupedBadges, "GroupeBandges");
  return <>{propertiesRender}</>;
};

export default Flat;
