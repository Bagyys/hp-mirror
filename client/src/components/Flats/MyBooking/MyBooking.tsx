import Button from '../../Button/button';
import { PropertyInterface } from '../../../store/types/propertyInterfaces';
import { useMediaPredicate } from 'react-media-hook';
import ImageSlider from '../../Slider/imageSlider';
import MainInformation from '../Flat/MainInformation/MainInformation';
import PropertiesType from '../Flat/PropertyType/PropertiesType';
import Ratings from '../Flat/Ratings/Ratings';
import classes from './MyBooking.module.scss';
import home from '../../../assets/images/home.png';
import calendarBegins from '../../../assets/images/calendar_booking_begins.png';
import calendarEnds from '../../../assets/images/calendar_booking_ends.png';
import { useState } from 'react';
import AboutPlace from '../QuickViewFlat/AboutPlace/AboutPlace';
import Badge from '../../Badge/Badge';
import InformationWithIcons from '../QuickViewFlat/InformationWithIcons/InformationWithIcons';
import { Link } from 'react-router-dom';
interface MyBookingPcProps {
  bookedProperty: PropertyInterface;
}
const MyBookingPc: React.FC<MyBookingPcProps> = (props) => {
  const isMobile = useMediaPredicate('(max-width: 675px)');
  const [showQuickView, setShowQuickView] = useState<boolean>(false);
  const quickViewHandler = () => {
    setShowQuickView(!showQuickView);
  };
  return (
    <li className={classes.MyBookingContainer}>
      <div
        style={showQuickView ? { height: '48rem' } : {}}
        className={classes.MyBookingFlatImg}
      >
        <ImageSlider
          sliderClass={showQuickView ? 'QuickView' : 'BookedFlatCard'}
          slides={props.bookedProperty.images}
        />
      </div>
      <div className={classes.MyBookingInfoContainer}>
        <div className={classes.Row}>
          <div className={classes.ApartamentInfo}>
            <Ratings
              overallRating={props.bookedProperty.overallRating}
              ratingsCount={props.bookedProperty.ratingsCount}
            />
            <PropertiesType>{props.bookedProperty.title}</PropertiesType>
            <MainInformation facilities={props.bookedProperty.facilities} />
            {showQuickView && !isMobile && (
              <Badge badge="BadgeCancelation">
                Free cancelation until July 6
              </Badge>
            )}
          </div>

          <div className={classes.BookingInfo}>
            <div className={classes.MyBookingBoxesContainer}>
              <div className={classes.MyBookingInfoBox}>
                <img src={home} alt="home" />
                <p>{props.bookedProperty.location.addressString1}</p>
              </div>
              <div className={classes.Separator}></div>
              <div className={classes.MyBookingInfoBox}>
                <img src={calendarBegins} alt="calendar begins" />
                <div>
                  <p className={classes.Bold}>Booking begins</p>
                  <p>2021-06-05</p>
                </div>
              </div>
              <div className={classes.Separator}></div>
              <div className={classes.MyBookingInfoBox}>
                <img src={calendarEnds} alt="calendar ends" />
                <div>
                  <p className={classes.Bold}>Booking ends</p>
                  <p>2021-06-16</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showQuickView && (
          <div className={classes.Row}>
            <div className={classes.AboutPlaceContainer}>
              <AboutPlace>{props.bookedProperty.description}</AboutPlace>
            </div>
            <div className={classes.InformationWithIconsContainer}>
              <InformationWithIcons
                facilities={props.bookedProperty.facilities}
              />
            </div>
          </div>
        )}
        <div
          style={showQuickView ? { width: '60rem' } : { width: '50rem' }}
          className={classes.FlatBtnsContainer}
        >
          {showQuickView ? (
            <Link
              to={{
                pathname: `/flat/${props.bookedProperty._id}`,
                state: { property: props.bookedProperty },
              }}
            >
              <Button btnType={'FlatInfo'} bgColor="Blue">
                Read more
              </Button>
            </Link>
          ) : (
            <Button
              clicked={quickViewHandler}
              btnType={'FlatInfo'}
              bgColor="Blue"
            >
              Quick View
            </Button>
          )}
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
          {showQuickView && (
            <p className={classes.Close} onClick={quickViewHandler}>
              Close
            </p>
          )}
        </div>
      </div>
    </li>
  );
};
export default MyBookingPc;
