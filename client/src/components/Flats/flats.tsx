import React, { useEffect, useMemo, useRef } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { StoreState } from '../../store/configureStore';
import { PropertyState } from '../../store/reducers/propertyReducer';
import { ErrorState } from '../../store/reducers/errorReducer';
import { PropertyInterface } from '../../store/types/propertyInterfaces';
import {
  activePropertyCordsAction,
  addRecentlyViewedAction,
  currentPageAction,
  pageSizeAction,
  quickViewAction,
  resetPropertyCordsAction,
} from '../../store/actions/propertyActions';
import { clearErrorAction } from '../../store/actions/errorActions';
import classes from './flats.module.scss';
import filterImg from '../../assets/images/filter.png';
import Flat from './Flat/Flat';
import Pagination from '../Pagination/Pagination';
import QuickViewFlat from './QuickViewFlat/QuickViewFlat';
import arrow from '../../assets/images/arrow2.png';
import Button from '../Button/button';
import { isStringInArray } from '../../utilities/isStringInArray';
import { userState } from '../../store/reducers/userReducer';
import { addToFavoriteAction } from '../../store/actions/userActions';
import SideFilter from '../SideFilter/SideFilter';
import { FilterState } from '../../store/reducers/filterReducer';
import Backdrop from '../Backdrop/Backdrop';
import { toggleFilterButtonAction } from '../../store/actions/filterActions';
import { cn } from '../../utilities/joinClasses';
import QuickViewFlatFavoritePc from './QuickViewFlatFavoritePc/QuickViewFlatFavoritePc';
import MyBookingPc from './MyBooking/MyBookingPc/MyBookingPc';
import { filterArrayById } from '../../utilities/filterArrayById';
import moment from 'moment';
import MyBookingMobile from './MyBooking/MyBookingMobile/MyBookingMobile';
import { availableProperties } from '../../utilities/availableProperties';

interface FlatsProps {
  isMain: boolean;
}
const Flats: React.FC<FlatsProps> = (props) => {
  const isMobile = useMediaPredicate('(max-width: 675px)');
  const dispatch = useDispatch();
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const auth: userState = useSelector((state: StoreState) => state.user);
  const startDate = mainPage.startDate;
  const endDate: any = mainPage.endDate;
  const { user } = auth;
  const filter: FilterState = useSelector((state: StoreState) => state.filter);
  const { isFilterOpen } = filter;
  const propertyStore: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const {
    quickViewPropertyId,
    pageSizeMain,
    currentPage,
    pageSizeFavorite,
    properties,
    recentlyViewedProperties,
  } = propertyStore;
  const errorState: ErrorState = useSelector(
    (state: StoreState) => state.error
  );
  const { error } = errorState;

  let fromToArray: Array<Date> = [];
  if (startDate) {
    const test = new Date(startDate);
    const test2 = new Date(endDate);
    while (test < test2) {
      // this line modifies the original firstDate reference which you want to make the while loop work
      test.setDate(test.getDate() + 1);
      // this pushes a new date , if you were to push firstDate then you will keep updating every item in the array
      fromToArray.push(new Date(test));
    }
  }

  const propertiesList = props.isMain
    ? availableProperties(properties, fromToArray)
    : filterArrayById(
        availableProperties(properties, fromToArray),
        user.favorites
      );

  const quickViewData = propertiesList.find(
    (item) => item._id === quickViewPropertyId
  );

  useEffect(() => {
    dispatch(quickViewAction(''));
  }, [currentPage, pageSizeMain]);
  // useEffect(() => {
  //   dispatch(currentPageAction(1));
  // }, []);

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
  const currentPaginationData = useMemo(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const firstPageIndex =
      (currentPage - 1) * (props.isMain ? pageSizeMain : pageSizeFavorite);
    const lastPageIndex =
      firstPageIndex + (props.isMain ? pageSizeMain : pageSizeFavorite);
    return propertiesList.slice(firstPageIndex, lastPageIndex);
  }, [
    currentPage,
    pageSizeMain,
    pageSizeFavorite,
    propertiesList,
    props.isMain,
  ]);

  const pageSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(pageSizeAction(Number(e.target.value)));
    dispatch(currentPageAction(1));
  };
  const favoritesHandler = (id: string) => {
    dispatch(addToFavoriteAction(id, user.favorites));
  };

  const QuickViewHandler = (id: string, cord: { lat: number; lng: number }) => {
    props.isMain && dispatch(activePropertyCordsAction(cord));
    dispatch(quickViewAction(id));
    dispatch(
      addRecentlyViewedAction(
        id,
        recentlyViewedProperties,
        props.isMain ? 2 : 4
      )
    );
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const toggleFilterHandler = () => {
    dispatch(toggleFilterButtonAction(!isFilterOpen));
  };
  const closeQuickViewHandler = () => {
    dispatch(quickViewAction(''));
    dispatch(resetPropertyCordsAction());
  };
  let propertiesRender = <></>;
  if (propertiesList.length > 0) {
    propertiesRender = (
      <React.Fragment>
        {/* Title for Favorite page PC */}
        {!props.isMain && !isMobile && <h2>Your favorites</h2>}
        {/* QuickView for filter page mobile and pc, and favorite page mobile */}
        {quickViewData && (props.isMain || isMobile) && (
          <QuickViewFlat
            clickedLike={() => favoritesHandler(quickViewData._id)}
            liked={isStringInArray(quickViewData._id, user.favorites)}
            close={closeQuickViewHandler}
            property={quickViewData}
            isMain={props.isMain}
          />
        )}
        <ul
          className={cn(
            classes.FlatsListConatiner,
            props.isMain
              ? classes.FlatsListConatinerMain
              : classes.FlatsListConatinerFavorite
          )}
        >
          {/* QuickView for favorite page pc */}
          {quickViewData && !props.isMain && !isMobile && (
            <QuickViewFlatFavoritePc
              clickedLike={() => favoritesHandler(quickViewData._id)}
              liked={isStringInArray(quickViewData._id, user.favorites)}
              close={closeQuickViewHandler}
              property={quickViewData}
              isMain={props.isMain}
            />
          )}
          {currentPaginationData
            .filter((item) => item._id !== quickViewPropertyId)
            .map((property: PropertyInterface) => {
              // let isOccupied = null;
              // property.occupiedTime.map((occupiedDay, index) => {
              //   for (let index = 0; index < fromToArray.length; index++) {
              //     let selectedDay = moment(fromToArray[index]).format(
              //       'YYYY-MM-DD'
              //     );
              //     if (occupiedDay.dateString === selectedDay) {
              //       // console.log(
              //       //   occupiedDay.dateString,
              //       //   'occupiedDay.dateString'
              //       // );
              //       // console.log(selectedDay, 'selectedDay');
              //       isOccupied = true;
              //     }
              //   }
              // });
              // // console.log(isOccupied, 'isOccupied');
              // if (!isOccupied) {
              return (
                <Flat
                  quickViewClicked={() =>
                    QuickViewHandler(property._id, property.location.cord)
                  }
                  isMain={props.isMain}
                  key={property._id}
                  property={property}
                  clickedLike={() => favoritesHandler(property._id)}
                  liked={isStringInArray(property._id, user.favorites)}
                />
              );
              // }
            })}
        </ul>
      </React.Fragment>
    );
  }
  let recentlyViewPropertiesRender = <></>;
  let recentlyViewed = filterArrayById(
    properties,
    recentlyViewedProperties
  ).reverse();
  //issiaiskinti reikiama funkcionaluma
  if (!isMobile && recentlyViewed.length > 0) {
    let recentlyView = props.isMain
      ? recentlyViewed.slice(0, 2)
      : recentlyViewed;
    recentlyViewPropertiesRender = (
      <div className={classes.RecentlyViewContainer}>
        <h2>Recently viewed</h2>
        <ul className={classes.FlatsListConatiner}>
          {recentlyView.map((property: PropertyInterface) => (
            <Flat
              clickedLike={() => favoritesHandler(property._id)}
              liked={isStringInArray(property._id, user.favorites)}
              key={property._id}
              property={property}
              isMain={props.isMain}
              quickViewClicked={() =>
                QuickViewHandler(property._id, property.location.cord)
              }
            />
          ))}
        </ul>
      </div>
    );
  }
  let myBookingsRender = <></>;
  //Testinis
  if (!props.isMain && propertiesList.length > 0) {
    const bookings = propertiesList.slice(-1);
    myBookingsRender = (
      <React.Fragment>
        {!isMobile && <h2>Your Bookings</h2>}
        <ul className={classes.MyBookingsContainer}>
          {bookings.map((property) =>
            isMobile ? (
              <MyBookingMobile key={property._id} BookedProperty={property} />
            ) : (
              <MyBookingPc key={property._id} BookedProperty={property} />
            )
          )}
        </ul>
      </React.Fragment>
    );
  }
  return (
    <div
      className={cn(
        classes.FlatsContainer,
        props.isMain
          ? classes.FlatsContainerMain
          : classes.FlatsContainerFavorite
      )}
    >
      <div
        className={cn(
          classes.FlatsContainerNav,
          props.isMain
            ? classes.FlatsContainerNavMain
            : classes.FlatsContainerNavFavorite
        )}
      >
        <div
          style={props.isMain && isMobile ? { display: 'none' } : {}}
          className={classes.FilterBtnContainer}
        >
          <Button
            clicked={toggleFilterHandler}
            btnType={props.isMain ? 'OpenFilter' : 'OpenFilterFavorite'}
            bgColor="Grey"
          >
            <img src={filterImg} />
          </Button>
          {!props.isMain && <h1>Favorites</h1>}
        </div>
        <div className={classes.RightSide}>
          {props.isMain && (
            <div className={classes.CustomSelect}>
              <select onChange={pageSizeHandler} value={pageSizeMain}>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
              </select>
            </div>
          )}

          {props.isMain && isMobile ? (
            <p className={classes.MobileResults}>
              {propertiesList.length} places to stay{' '}
              <img src={arrow} alt="Arrow2" />
            </p>
          ) : (
            <p className={classes.PcResults}>{propertiesList.length} results</p>
          )}
        </div>
      </div>
      {myBookingsRender}
      {propertiesRender}
      {!isMobile && (
        <>
          <Pagination
            currentPage={currentPage}
            totalCount={propertiesList.length}
            pageSize={props.isMain ? pageSizeMain : pageSizeFavorite}
            onPageChange={(page) => dispatch(currentPageAction(page))}
          />

          {recentlyViewPropertiesRender}
        </>
      )}
      {isFilterOpen && <SideFilter toggleHandler={toggleFilterHandler} />}
      {isFilterOpen && (
        <Backdrop
          isVisible={isFilterOpen}
          toggleHandler={toggleFilterHandler}
        ></Backdrop>
      )}
    </div>
  );
};

export default Flats;
