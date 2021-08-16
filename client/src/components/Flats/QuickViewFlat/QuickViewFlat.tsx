import classes from './QuickViewFlat.module.scss';
import ImageSlider from '../../Slider/imageSlider';
import Button from '../../Button/button';
// import DiscountBadge from '../Flat/DiscountBadge/DiscountBadge';
import LongBadge from './LongBadge/LongBadge';
import Ratings from '../Flat/Ratings/Ratings';
import PropertiesType from '../Flat/PropertyType/PropertiesType';
import MainInformation from '../Flat/MainInformation/MainInformation';
import Prices from '../Flat/Prices/Prices';
import AboutPlace from './AboutPlace/AboutPlace';
import InformationWithIcons from './InformationWithIcons/InformationWithIcons';
import { PropertyInterface } from '../../../store/types/propertyInterfaces';
import { Link } from 'react-router-dom';
interface QuickViewFlatProps {
  property: PropertyInterface;
}

const QuickViewFlat: React.FC<QuickViewFlatProps> = (props) => {
  return (
    <div className={classes.QuickViewFlatContainer}>
      <div className={classes.SliderWithInfoContainer}>
        <ImageSlider borders="QuickView" slides={props.property.images} />
        <div className={classes.InfoContainer}>
          <Ratings
            overallRating={props.property.overallRating}
            ratingsCount={props.property.ratingsCount}
          />
          <PropertiesType type={props.property.type} />
          <MainInformation facilities={props.property.facilities} />
        </div>
      </div>
      <div className={classes.ExtraInformationContainer}>
        <LongBadge badge="BadgeDiscount">
          Discount available on long term
        </LongBadge>
        <LongBadge badge="BadgeCancelation">
          Free cancelation until July 6
        </LongBadge>
        <InformationWithIcons facilities={props.property.facilities} />
      </div>
      <div className={classes.AboutPlaceContainer}>
        <AboutPlace description={props.property.description} />
      </div>
      <div className={classes.PriceBtnContainer}>
        <Prices price={props.property.price.daily} />
        <Button btnType={'FlatInfo'} show={true}>
          <Link
            to={{
              pathname: `/flat/${props.property._id}`,
              state: { property: props.property },
            }}
          >
            Read all details and Reserve
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default QuickViewFlat;
