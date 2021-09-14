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
  myBookingQuickViewAction,
  pageSizeAction,
  quickViewAction,
  resetPropertyCordsAction,
} from '../../store/actions/propertyActions';
import { clearErrorAction } from '../../store/actions/errorActions';
import classes from './Flats.module.scss';
import Flat from '../../routes/components/Flat/Flat';
import Pagination from '../Pagination/Pagination';
import QuickViewFlat from '../../routes/components/QuickViewFlat/QuickViewFlat';
import { userState } from '../../store/reducers/userReducer';
import { addToFavoriteAction } from '../../store/actions/userActions';
import { cn } from '../../utilities/joinClasses';
import QuickViewFlatFavoritePc from '../../routes/components/QuickViewFlatFavoritePc/QuickViewFlatFavoritePc';
import MyBooking from '../../routes/components/MyBooking/MyBooking';
import MyBookingMobile from '../../routes/components/MyBookingMobileStick/MyBookingMobileStick';
import {
  filterArrayById,
  isStringInArray,
} from '../../utilities/flatsFunctions';
import { toggleFilterButtonAction } from '../../store/actions/filterActions';
import { FilterState } from '../../store/reducers/filterReducer';
import FlatsNav from '../../routes/components/FlatsNav/FlatsNav';

interface FlatsProps {
  isMain: boolean;
}
const Flats: React.FC<FlatsProps> = (props) => {
  const isMobile = useMediaPredicate('(max-width: 675px)');
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const auth: userState = useSelector((state: StoreState) => state.user);
  const { user } = auth;
  const propertyStore: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const {
    quickViewPropertyId,
    myBookingQuickViewId,
    pageSizeMain,
    currentPage,
    pageSizeFavorite,
    properties,
    recentlyViewedProperties,
  } = propertyStore;
  const filterSide: FilterState = useSelector(
    (state: StoreState) => state.filter
  );
  const { isFilterOpen } = filterSide;
  const errorState: ErrorState = useSelector(
    (state: StoreState) => state.error
  );
  const { error } = errorState;

  const propertiesList = useMemo(
    () =>
      props.isMain ? properties : filterArrayById(properties, user.favorites),
    [props.isMain, user.favorites, properties]
  );

  const quickViewData = propertiesList?.find(
    (item) => item._id === quickViewPropertyId
  );
  console.log(quickViewData);
  useEffect(() => {
    dispatch(quickViewAction(''));
  }, [currentPage, pageSizeMain]);

  useEffect(() => {
    dispatch(currentPageAction(1));
  }, []);

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
    return propertiesList?.slice(firstPageIndex, lastPageIndex);
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

  const quickViewHandler = (id: string, cord: { lat: number; lng: number }) => {
    props.isMain && dispatch(activePropertyCordsAction(cord));
    dispatch(quickViewAction(id));
    dispatch(
      addRecentlyViewedAction(
        id,
        recentlyViewedProperties,
        props.isMain ? 2 : 4
      )
    );
    props.isMain
      ? window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      : scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const closeQuickViewHandler = () => {
    dispatch(quickViewAction(''));
    dispatch(resetPropertyCordsAction());
    props.isMain
      ? window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      : scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const myBookingQuickViewHandler = (id: string) => {
    dispatch(myBookingQuickViewAction(id));
  };
  const closeMyBookingQuickViewHandler = () => {
    dispatch(myBookingQuickViewAction(''));
  };
  let propertiesRender = <></>;
  if (propertiesList?.length > 0) {
    propertiesRender = (
      <React.Fragment>
        {/* Title for Favorite page PC */}
        {!props.isMain && (
          <h2 ref={!props.isMain && scrollRef}>Your Favorites</h2>
        )}
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
              return (
                <Flat
                  quickViewClicked={() =>
                    quickViewHandler(property._id, property.location.cord)
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
    propertiesList,
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
                quickViewHandler(property._id, property.location.cord)
              }
            />
          ))}
        </ul>
      </div>
    );
  }
  let myBookingsRender = <></>;
  //Testinis
  if (!props.isMain && propertiesList?.length > 0) {
    const bookings = propertiesList?.slice(-2);
    myBookingsRender = (
      <React.Fragment>
        <h2>Your Bookings</h2>
        <ul className={classes.MyBookingsContainer}>
          {bookings.map((property) => (
            <MyBooking
              key={property._id}
              close={closeMyBookingQuickViewHandler}
              myBookingQuickViewClicked={() =>
                myBookingQuickViewHandler(property._id)
              }
              isQuickViewed={
                myBookingQuickViewId !== '' &&
                myBookingQuickViewId === property._id
              }
              bookedProperty={property}
            />
          ))}
        </ul>
        {/* Veliau padaryti pagal artimiausia data */}
        {isMobile && (
          <MyBookingMobile key={bookings[0]._id} BookedProperty={bookings[0]} />
        )}
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
      <FlatsNav
        pageSize={pageSizeMain}
        pageSizeHandler={pageSizeHandler}
        numberOfApartaments={propertiesList?.length}
        isMain={props.isMain}
        filterOpen={() => dispatch(toggleFilterButtonAction(!isFilterOpen))}
      />
      {myBookingsRender}
      {propertiesRender}
      {!isMobile && (
        <React.Fragment>
          <Pagination
            currentPage={currentPage}
            totalCount={propertiesList?.length}
            pageSize={props.isMain ? pageSizeMain : pageSizeFavorite}
            onPageChange={(page) => dispatch(currentPageAction(page))}
          />

          {recentlyViewPropertiesRender}
        </React.Fragment>
      )}
    </div>
  );
};

export default Flats;
