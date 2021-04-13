import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Calendar, { CalendarTileProperties } from "react-calendar";
import { IoShareSocialSharp } from "react-icons/io5";
import { BiHeart } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { GrRotateRight } from "react-icons/gr";
import { MdKeyboardArrowRight } from "react-icons/md";

import BreadCrumbs from "../../components/BreadCrums/BreadCrums";
import "./calendar.scss";
// import "react-calendar/dist/Calendar.css";
import DefaultSlide from "../../components/Slider/defaultSlide/defaultSlide";
import Schedule from "../../components/Schedule/schedule";
import { StoreState } from "../../store/configureStore";
import { PropertyProps } from "../../store/reducers/propertyReducer";
import { getOnePropertyAction } from "../../store/actions/propertyActions";

import classes from "./FlatReview.module.scss";
interface PropsInterface {
  location: {
    state: {
      property: PropertyProps;
    };
    pathname: string;
  };
}

const FlatView = (props: PropsInterface) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  // const { query, search } = useLocation();
  console.log("id");
  console.log(id);
  // console.log("props");
  // console.log(props);
  console.log("props.location.state");
  console.log(props.location.state);
  useEffect(() => {
    console.log("cia");
    console.log("usefect");
    if (props.location.state === undefined) {
      console.log("usefect true");
      dispatch(getOnePropertyAction(id));
    }
  }, []);
  // if (Object.keys(property).length === 0) {
  const stateProperty = useSelector((state: StoreState) => state.properties[0]);
  // }
  let property: PropertyProps = {} as PropertyProps;
  if (props && props.location.state) {
    property = props.location.state.property;
  } else {
    property = stateProperty;
  }

  console.log("property");
  console.log(property);
  const occupiedTime = property.occupiedTime;
  const [date, setDate] = useState<any>("");
  const [calendarDate, setCalendarDate] = useState<
    undefined | Date | Array<Date>
  >(undefined);
  const [current, setCurrent] = useState<number>(0);
  const [toggleCalendar, setCalendar] = useState<boolean>(false);
  const [openSchedule, setSchedule] = useState<boolean>(false);

  const getDatesInRange = (start: Date, end: Date) => {
    let dates: any = [];
    //to avoid modifying the original date
    const theDate = new Date(start);
    while (theDate < end) {
      dates = [...dates, new Date(theDate)];
      theDate.setDate(theDate.getDate() + 1);
    }
    console.log("getDatesInsideRange dates");
    console.log(dates);
    return dates;
  };

  const schedule = () => {
    if (!openSchedule) {
      setSchedule(true);
    } else {
      setSchedule(false);
    }
  };

  // const handleDayClick = (day: Date) => {
  //   if (calendarDate) {
  //     if (calendarDate instanceof Date) {
  //       setCalendarDate([calendarDate as Date, day]);
  //     } else {
  //       setCalendarDate(day);
  //     }
  //   } else {
  //     setCalendarDate(day);
  //   }
  // };
  const checkAvailability = () => {
    if (calendarDate instanceof Array) {
      const datesInRange = getDatesInRange(calendarDate[0], calendarDate[1]);

      const displayDays = datesInRange.map((day: Date) => {
        console.log("day");
        console.log(day);
        //         const occDay = occupiedTime.map((occupiedDay) => {
        // if(day.getFullYear() === new Date(occupiedDay.date).getFullYear() &&
        // day.getMonth() === new Date(occupiedDay.date).getMonth() &&
        // day.getDate() === new Date(occupiedDay.date).getDate()){
        // return occupiedDay
        // }
        //         }
        return day;
      });
      // kaip atvaizduoti kiekviena diena?

      // kaip atvaizduoti valandos laisvas ar uzimtas minutes?
    }
    // console.log("disableTiles date");
    // console.log(date);
    // const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    // if calendar day date is greater than yesterday, leave it available
    // if (date > yesterday) {
    // check propertie's occupiedTime array
    occupiedTime.forEach((occupiedDay) => {
      // console.log("occupiedDay");
      // console.log(occupiedDay);
      const occupiedDate = new Date(occupiedDay.date);
      occupiedDate.setHours(0, 0, 0);
      const displayedDate = new Date(date);
      displayedDate.setHours(0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0);

      // console.log("occupiedDay.date");
      // console.log(occupiedDay.date);
      console.log("occupiedDate");
      console.log(occupiedDate);
      console.log("displayedDate");
      console.log(displayedDate);
      // console.log("disableTiles date");
      // console.log(date);
      console.log("today === displayedDate");
      console.log(today === displayedDate);
      // if there's an object of the same date
      if (today === displayedDate) {
        console.log(true);
        console.log("occupiedDay.isWholeDayRented");
        console.log(occupiedDay.isWholeDayRented);
        // check if the whole day is rented
        if (occupiedDay.isWholeDayRented) {
          // disable tile, if true
          return true;
          // if not
        } else return false;
        // {
        //   console.log("calendarDate instanceof Array");
        //   console.log(calendarDate instanceof Array);
        //   if (calendarDate instanceof Array) {
        //     const datesInRange = getDatesInRange(
        //       calendarDate[0],
        //       calendarDate[1]
        //     );
        //     console.log("datesInRange");
        //     console.log(datesInRange);
        //     console.log("datesInRange.length > 2");
        //     console.log(datesInRange.length > 2);
        //     console.log("datesInRange.some((day: Date) => day === date)");
        //     console.log(datesInRange.some((day: Date) => day === date));
        //     console.log("occupiedDay.isRented");
        //     console.log(occupiedDay.isRented);
        //     // check if the date is inside a daterange, greater than two days
        //     if (
        //       datesInRange.length > 2 &&
        //       datesInRange.some((day: Date) => day === date) &&
        //       occupiedDay.isRented
        //     ) {
        //       return true;
        //     } else return false;
        //   }
        // }
      }
    });

    // if (calendarDate instanceof Date) {

    // }
    // tikrinti, ar ta diena isWholeDayRented

    // occupiedTime.map
    // occupiedTime masyvo map
    // tikrinti isWholeDayRented ? return true : else tikrinti
    // ar tai nera pirma ar paskutine diena ? return false : else tikrinti
    // isRented ir ar yra rentedHours masyve uzimtu valandu
    return false;
    // } else return true;
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
          temparray.push("/no-photo.png");
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
    const hourlyCheckArray: Array<Date> = [];
    property.occupiedTime.map((item: any) => {
      if (item.isWholeDayRented) {
        hourlyCheckArray.push(new Date(item.date));
      }
    });
    // console.log(date.length, "Date");

    // console.log("date");
    // console.log(date);
    console.log(" finish calendarDate");
    console.log(calendarDate);

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
              <div>
                <h2>Daily Rent</h2>
                <p>{property.price.daily}€</p>
              </div>
              <div>
                <h2>Hourly Rent</h2>
                <p>{property.price.daily}€</p>
              </div>
              <div>
                <h2>Bedrooms</h2>
                <p>
                  {property.type} - {property.facilities.beds} bd
                </p>
              </div>
              <div>
                <h2>Square Feet</h2>
                <p>50 sq ft</p>
              </div>
            </div>
          </div>
          <div className={classes.calendar}>
            <div>
              <Calendar
                onChange={setCalendarDate}
                value={calendarDate}
                selectRange={true}
                minDate={new Date()}
                tileDisabled={({ date }) =>
                  hourlyCheckArray.some(
                    (time: Date) =>
                      date.getFullYear() === time.getFullYear() &&
                      date.getMonth() === time.getMonth() &&
                      date.getDate() === time.getDate()
                  )
                }
              />
            </div>
            <button onClick={checkAvailability}>Check Availability</button>
          </div>
        </div>
        <div className={classes.Schedule}>
          {openSchedule ? (
            <Schedule
              date={toggleCalendar ? date[0] : date}
              endDate={date[1]}
              occupiedTime={property.occupiedTime}
              occupiedTimeByHour={property.occupiedTime}
              calendarSwitcher={toggleCalendar}
            />
          ) : null}
        </div>
      </div>
    );
  }

  return <div className={classes.FlatReview}>{propertyRender}</div>;
};

export default FlatView;
