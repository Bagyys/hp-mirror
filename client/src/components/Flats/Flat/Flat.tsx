import { useMediaPredicate } from 'react-media-hook';
import classes from './Flat.module.scss';
import ImageSlider from '../../Slider/imageSlider';
import Button from '../../Button/button';
import GroupedBadges from './GroupedBadges/GroupedBadges';
import Ratings from './Ratings/Ratings';
import Favorites from './Favorites/Favorites';
import PropertyType from './PropertyType/PropertiesType';
import MainInformation from './MainInformation/MainInformation';
import { Link } from 'react-router-dom';
import { PropertyInterface } from '../../../store/types/propertyInterfaces';
import DailyPrice from './DailyPrices/DailyPrice';
import { cn } from '../../../utilities/joinClasses';

interface FlatProps {
  property: PropertyInterface;
  favoritePage?: boolean;
  liked: boolean;
  quickViewClicked?: () => void;
  clickedLike: () => void;
  isMain?: boolean;
}
const Flat: React.FC<FlatProps> = (props) => {
  const isMobile = useMediaPredicate('(max-width: 675px)');

  let propertiesRender = (
    <li
      className={cn(
        classes.Flat,
        props.isMain ? classes.FlatMain : classes.FlatFavorite
      )}
    >
      <div className={classes.FlatContent}>
        <div className={classes.FlatImg}>
          <ImageSlider borders="FlatCard" slides={props.property.images} />
          <Favorites liked={props.liked} clickedLike={props.clickedLike} />
        </div>
        <div className={classes.InfoContainer}>
          <div className={classes.Info}>
            <GroupedBadges {...props.property.discount} />
            <Ratings
              overallRating={props.property.overallRating}
              ratingsCount={props.property.ratingsCount}
            />
            <PropertyType>{props.property.type}</PropertyType>

            <MainInformation facilities={props.property.facilities} />

            <div className={classes.PriceBtnContainer}>
              <div className={classes.PriceContainer}>
                <DailyPrice price={props.property.price.daily} />
                <p className={classes.TotalPrice}>244€ total</p>
              </div>

              <div className={classes.FlatBtnsContainer}>
                <Button clicked={props.quickViewClicked} btnType={'FlatInfo'}>
                  Quick View
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
  return <>{propertiesRender}</>;
};

export default Flat;
