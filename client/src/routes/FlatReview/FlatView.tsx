import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { DateRange, OnChangeProps } from 'react-date-range';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { IoShareSocialSharp } from 'react-icons/io5';
import { BiHeart } from 'react-icons/bi';
import { BsStarFill } from 'react-icons/bs';
import { MdVerifiedUser } from 'react-icons/md';
import { GrRotateRight } from 'react-icons/gr';
import { MdKeyboardArrowRight } from 'react-icons/md';

import BreadCrumbs from '../../components/BreadCrums/BreadCrums';
import DefaultSlide from '../../components/Slider/defaultSlide/defaultSlide';
import BookingSchedule from '../../components/BookingSchedule/BookingSchedule';
import { StoreState } from '../../store/configureStore';
import { PropertyState } from '../../store/reducers/propertyReducer';
import { ErrorState } from '../../store/reducers/errorReducer';
import { userState } from '../../store/reducers/userReducer';
import { PropertyInterface } from '../../store/types/propertyInterfaces';
import { getOnePropertyAction } from '../../store/actions/propertyActions';
import {
  checkAvailabilityAction,
  bookTimeAction,
} from '../../store/actions/bookingActions';
import { clearErrorAction } from '../../store/actions/errorActions';

import classes from './FlatReview.module.scss';
interface CustomRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

export interface DisplayDay {
  day: Date;
  occupied: boolean;
  occIndex?: number;
}

interface PropsInterface {
  location: {
    state: {
      property: PropertyInterface;
    };
    pathname: string;
  };
}

const FlatView = (props: PropsInterface) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (props.location.state === undefined) {
      dispatch(getOnePropertyAction(id));
    }
  }, []);

  const propertyStore: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const properties: Array<PropertyInterface> = propertyStore.properties;
  const stateProperty: PropertyInterface = properties[0];

  const booking = useSelector((state: StoreState) => state.booking);

  const auth: userState = useSelector((state: StoreState) => state.user);
  const user = auth.user;

  const errorState: ErrorState = useSelector(
    (state: StoreState) => state.error
  );
  const { error } = errorState;

  const handleError = () => {
    dispatch(clearErrorAction());
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: error,
        text: 'Please try again',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK',
      }).then(() => {
        handleError();
      });
    }
  }, [error]);

  let property: PropertyInterface = {} as PropertyInterface;
  if (props && props.location.state) {
    property = props.location.state.property;
  } else {
    property = stateProperty;
  }

  const [range, setRange] = useState([
    {
      startDate: moment.utc().startOf('day').toDate(),
      endDate: moment.utc().add(1, 'day').startOf('day').toDate(),
      key: 'selection',
    },
  ]);
  const [current, setCurrent] = useState<number>(0);
  const [isScheduleOpened, setIsScheduleOpened] = useState<boolean>(false);
  const occupiedTime = property.occupiedTime;

  const hourlyCheckArray: Array<Date> = [];
  occupiedTime.map((item: any) => {
    // TODO: typescript interface
    if (item.isWholeDayRented) {
      hourlyCheckArray.push(new Date(item.dateString));
    }
    return item;
  });

  const handleRange = (item: any) => {
    // TODO: solve typescript conflict
    setRange([item.selection as CustomRange]);
  };
  const getDatesInRange = (start: Date, end: Date) => {
    let dates: Date[] = [];
    let theDate = start;
    if (start === end) {
      dates.push(theDate);
    } else {
      while (theDate <= end) {
        dates = [...dates, theDate];
        theDate = moment.utc(theDate).add(1, 'day').toDate();
      }
    }
    return dates;
  };

  const calculatePrice = () => {
    let finalPrice = 0;
    const { totalDays, totalHours } = booking;
    if (totalHours % 24 <= 5) {
      if (
        property.price.daily !== undefined &&
        property.price.hourly !== undefined
      ) {
        finalPrice =
          property.price.daily * (totalDays - 1) +
          ((property.price.hourly * totalHours) % 24);
      } else if (property.price.hourly !== undefined) {
        finalPrice = property.price.hourly * totalHours;
      } else if (
        property.price.daily !== undefined &&
        property.price.hourly === undefined
      ) {
        finalPrice = property.price.daily * (totalDays - 1);
      }
    } else {
      if (
        property.price.daily !== undefined &&
        property.price.hourly !== undefined
      ) {
        finalPrice = property.price.daily * totalDays;
      } else if (property.price.hourly !== undefined) {
        finalPrice = property.price.hourly * totalHours;
      } else if (
        property.price.daily !== undefined &&
        property.price.hourly === undefined
      ) {
        finalPrice = property.price.daily * totalDays;
      }
    }
    return finalPrice;
  };

  const checkAvailability = () => {
    // get number of selected days
    const selectedDays = getDatesInRange(range[0].startDate, range[0].endDate);
    dispatch(checkAvailabilityAction(selectedDays, occupiedTime));
    setIsScheduleOpened(true);
  };
  const handleBooking = async (residents: number) => {
    console.log('user._id');
    console.log(user._id);
    const body = {
      userId: user._id,
      propertyId: property._id,
      residents,
      price: calculatePrice(),
      startDate: booking.startTime!,
      endDate: booking.endTime!,
      timeZone: property.location.timeZone,
      occupiedTime: booking.displayDays,
    };
    await dispatch(bookTimeAction(body));
    history.push('/reservations');
  };

  let propertyRender = <></>;
  if (property) {
    const element1 = [
      property.images[0],
      property.images[1],
      property.images[2],
      property.images[3],
      property.images[4],
    ];
    let ultimateArray = [];
    ultimateArray.push(element1);

    let arrayAfterLoad = property.images.slice(5);
    var i,
      j,
      temparray,
      chunk = 8;

    for (i = 0, j = arrayAfterLoad.length; i < j; i += chunk) {
      temparray = arrayAfterLoad.slice(i, i + chunk);

      if (temparray.length < 8) {
        let leftSpace = 8 - temparray.length;
        for (i = 0; i < leftSpace; i++) {
          temparray.push('/no-photo.png');
        }
      }
      const testArray = [];
      testArray.push(temparray);

      ultimateArray = [...ultimateArray, ...testArray];
    }

    const length = ultimateArray.length;

    const nextSlide = () => {
      setCurrent(current === 0 ? length - 1 : current - 1);
    };

    const prevSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };

    if (!Array.isArray(ultimateArray) || ultimateArray.length <= 0) {
      return null;
    }

    propertyRender = (
      <div className={classes.FlatBox}>
        <div className={classes.ImagesBox}>
          <div className={classes.arrowRight}>
            <MdKeyboardArrowRight
              size="8em"
              color="white"
              onClick={prevSlide}
            />
          </div>
          <div className={classes.arrowLeft}>
            <MdKeyboardArrowRight
              size="8em"
              color="white"
              onClick={nextSlide}
            />
          </div>
          {ultimateArray.map((item, index) => {
            if (index === 0) {
              return (
                <div
                  className={
                    index === current
                      ? `${classes.slide} ${classes.active}`
                      : classes.slide
                  }
                  key={index}
                >
                  {index === current && (
                    <div key={index} className={classes.Images}>
                      <DefaultSlide images={property.images} />
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  className={
                    index === current
                      ? `${classes.slide} ${classes.active}`
                      : classes.slide
                  }
                >
                  <div className={classes.Images2}>
                    {/* {index === current &&
                      item.map((photo: string, index: string) => {
                        return (
                          <div key={index} className={classes.imgBox}>
                            <img src={photo} alt="Flat" />
                          </div>
                        );
                      })} */}
                  </div>
                </div>
              );
            }
          })}
          <div className={classes.totalNumber}>
            <span>44 photos</span>
            <span>3 virtual tours</span>
            <span>1 video</span>
          </div>
        </div>
        <div className={classes.contentBox}>
          <div className={classes.content}>
            <div className={classes.breadCrumbsPanel}>
              <BreadCrumbs pathname={props.location.pathname} />
              <div className={classes.publishedAt}>
                <GrRotateRight size="2.5em" color="#4886ff" />
                <span>Today</span>
              </div>
            </div>
            <div className={classes.upperDiv}>
              <h1>{property.title}</h1>
              <div className={classes.icons}>
                <IoShareSocialSharp size="3.5em" color="#4886ff" />
                <BiHeart size="3.5em" color="#4886ff" />
              </div>
            </div>
            <div className={classes.address}>
              <h2>{property.location.addressString1}</h2>
            </div>
            <div className={classes.rating}>
              <div className={classes.starRating}>
                <BsStarFill size="2em" color="#4886ff" />
                <BsStarFill size="2em" color="#4886ff" />
                <BsStarFill size="2em" color="#4886ff" />
                <BsStarFill size="2em" color="#4886ff" />
                <BsStarFill size="2em" color="#4886ff" />
                <span>5.0 (10 Reviews)</span>
              </div>
              <div className={classes.isVerified}>
                <MdVerifiedUser size="2em" color="#4886ff" />
                <span>Verified Listing</span>
              </div>
            </div>
            <div className={classes.Specifications}>
              {property.price.daily ? (
                <div>
                  <h2>Daily Rent</h2>
                  <p>{property.price.daily}€</p>
                </div>
              ) : (
                <></>
              )}
              {property.price.hourly ? (
                <div>
                  <h2>Hourly Rent</h2>
                  <p>{property.price.hourly}€</p>
                </div>
              ) : (
                <></>
              )}
              <div>
                <h2>Bedrooms</h2>
                <p>
                  {property.type} - {property.facilities.beds} bd
                </p>
              </div>
              <div>
                <h2>Square Meters</h2>
                <p>{property.facilities.size} sq m</p>
              </div>
            </div>
          </div>
          <div className={classes.calendar}>
            <div>
              <DateRange
                minDate={new Date()}
                editableDateInputs={true}
                onChange={(range: OnChangeProps) => {
                  handleRange(range);
                  // setRange([range.selection as CustomRange]) // Typescript conflict
                }}
                moveRangeOnFirstSelection={false}
                ranges={range}
                disabledDates={hourlyCheckArray}
              />
            </div>
            <button onClick={checkAvailability}>Check Availability</button>
          </div>
        </div>
        <div className={classes.Schedule}>
          {isScheduleOpened ? (
            <BookingSchedule
              timeZone={property.location.timeZone}
              handleBooking={handleBooking}
            />
          ) : null}
        </div>
      </div>
    );
  }

  return <div className={classes.FlatReview}>{propertyRender}</div>;
};

export default FlatView;
