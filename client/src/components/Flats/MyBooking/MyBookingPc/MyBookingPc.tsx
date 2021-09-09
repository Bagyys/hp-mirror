import Button from '../../../Button/button';
import { PropertyInterface } from '../../../../store/types/propertyInterfaces';
import ImageSlider from '../../../Slider/imageSlider';
import MainInformation from '../../Flat/MainInformation/MainInformation';
import PropertiesType from '../../Flat/PropertyType/PropertiesType';
import Ratings from '../../Flat/Ratings/Ratings';
import classes from './MyBookingPc.module.scss';
import home from '../../../../assets/images/home.png';
import calendarBegins from '../../../../assets/images/calendar_booking_begins.png';
import calendarEnds from '../../../../assets/images/calendar_booking_ends.png';
import { useEffect, useRef, useState } from 'react';
import AboutPlace from '../../QuickViewFlat/AboutPlace/AboutPlace';
import Badge from '../../../Badge/Badge';
import InformationWithIcons from '../../QuickViewFlat/InformationWithIcons/InformationWithIcons';
interface MyBookingPcProps {
  BookedProperty: PropertyInterface;
}
const MyBookingPc: React.FC<MyBookingPcProps> = (props) => {
  const targetRef = useRef<HTMLLIElement>(null);
  //Height of my_bookings li element, to dinamically change slider height, if address is longer
  const [dimensions, setDimensions] = useState<number | undefined>(0);
  const [showQuickView, setShowQuickView] = useState<boolean>(false);
  useEffect(() => {
    setDimensions(targetRef.current?.clientHeight);
  }, []);
  const quickViewHandler = () => {
    setShowQuickView(!showQuickView);
  };
  console.log(dimensions);
  return (
    <li ref={targetRef} className={classes.MyBookingContainer}>
      <div className={classes.MyBookingFlatImg}>
        <ImageSlider
          sliderClass="BookedFlatCard"
          slides={props.BookedProperty.images}
          height={showQuickView ? 460 : dimensions}
        />
      </div>
      <div className={classes.MyBookingInfoContainer}>
        <div className={classes.Row}>
          <div className={classes.ApartamentInfo}>
            <Ratings
              overallRating={props.BookedProperty.overallRating}
              ratingsCount={props.BookedProperty.ratingsCount}
            />
            <PropertiesType>{props.BookedProperty.title}</PropertiesType>
            <MainInformation facilities={props.BookedProperty.facilities} />
            {showQuickView && (
              <Badge badge="BadgeCancelation">
                Free cancelation until July 6
              </Badge>
            )}
          </div>

          <div className={classes.BookingInfo}>
            <div className={classes.MyBookingBoxesContainer}>
              <div className={classes.MyBookingInfoBox}>
                <img src={home} alt="home" />
                <p>{props.BookedProperty.location.addressString1}</p>
              </div>
              <div className={classes.Separator}></div>
              <div className={classes.MyBookingInfoBox}>
                <img src={calendarBegins} alt="calendar begins" />
                <p className={classes.Bold}>Booking begins</p>
                <p>2021-06-05</p>
              </div>
              <div className={classes.Separator}></div>
              <div className={classes.MyBookingInfoBox}>
                <img src={calendarEnds} alt="calendar ends" />
                <p className={classes.Bold}>Booking ends</p>
                <p>2021-06-16</p>
              </div>
            </div>
          </div>
        </div>
        {showQuickView && (
          <div className={classes.Row}>
            <div className={classes.AboutPlaceContainer}>
              <AboutPlace>{props.BookedProperty.description}</AboutPlace>
            </div>
            <div className={classes.InformationWithIconsContainer}>
              <InformationWithIcons
                facilities={props.BookedProperty.facilities}
              />
            </div>
          </div>
        )}
        <div className={classes.FlatBtnsContainer}>
          <Button
            clicked={quickViewHandler}
            btnType={'FlatInfo'}
            bgColor="Blue"
          >
            Quick View
          </Button>
          <Button
            clicked={() => console.log('labas')}
            btnType={'FlatInfo'}
            bgColor="Orange"
          >
            Unlock door
          </Button>
          <Button
            clicked={() => console.log('labas')}
            btnType={'FlatInfo'}
            bgColor="Red"
          >
            Contact owner
          </Button>
        </div>
      </div>
    </li>
  );
};
export default MyBookingPc;
