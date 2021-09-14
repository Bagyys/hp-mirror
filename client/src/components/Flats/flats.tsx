import React, { useEffect, useMemo, useRef } from "react";
import { useMediaPredicate } from "react-media-hook";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { StoreState } from "../../store/configureStore";
import { PropertyState } from "../../store/reducers/propertyReducer";
import { ErrorState } from "../../store/reducers/errorReducer";
import { PropertyInterface } from "../../store/types/propertyInterfaces";
import {
  activePropertyCordsAction,
  addRecentlyViewedAction,
  currentPageAction,
  pageSizeAction,
  quickViewAction,
  resetPropertyCordsAction,
} from "../../store/actions/propertyActions";
import { clearErrorAction } from "../../store/actions/errorActions";
import classes from "./Flats.module.scss";
import filterImg from "../../assets/images/filter.png";
import Flat from "../../routes/components/Flat/Flat";
import Pagination from "../Pagination/Pagination";
import QuickViewFlat from "../../routes/components/QuickViewFlat/QuickViewFlat";
import arrow from "../../assets/images/arrow2.png";
import Button from "../../routes/components/Button/button";
import { userState } from "../../store/reducers/userReducer";
import { addToFavoriteAction } from "../../store/actions/userActions";
import { cn } from "../../utilities/joinClasses";
import QuickViewFlatFavoritePc from "../../routes/components/QuickViewFlatFavoritePc/QuickViewFlatFavoritePc";
import MyBooking from "../../routes/components/MyBooking/MyBooking";
import MyBookingMobile from "../../routes/components/MyBookingMobileStick/MyBookingMobileStick";
import {
  filterArrayById,
  isStringInArray,
} from "../../utilities/flatsFunctions";

interface FlatsProps {
  isMain: boolean;
  toggleFilter: () => void;
}
const Flats: React.FC<FlatsProps> = (props) => {
  const isMobile = useMediaPredicate("(max-width: 675px)");
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const auth: userState = useSelector((state: StoreState) => state.user);
  const { user } = auth;
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

  const propertiesList = useMemo(
    () =>
      props.isMain ? properties : filterArrayById(properties, user.favorites),
    [props.isMain, user.favorites, properties]
  );

  const quickViewData = propertiesList?.find(
    (item) => item._id === quickViewPropertyId
  );

  useEffect(() => {
    dispatch(quickViewAction(""));
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
        text: "Please try again",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      }).then(() => {
        handleError();
      });
    }
  }, [error]);
  const currentPaginationData = useMemo(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
  console.log(properties, pageSizeMain);
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
          behavior: "smooth",
        })
      : scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const closeQuickViewHandler = () => {
    dispatch(quickViewAction(""));
    dispatch(resetPropertyCordsAction());
    props.isMain
      ? window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      : scrollRef.current?.scrollIntoView({ behavior: "smooth" });
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
            <MyBooking key={property._id} bookedProperty={property} />
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
      <div
        className={cn(
          classes.FlatsContainerNav,
          props.isMain
            ? classes.FlatsContainerNavMain
            : classes.FlatsContainerNavFavorite
        )}
      >
        <div
          style={props.isMain && isMobile ? { display: "none" } : {}}
          className={classes.FilterBtnContainer}
        >
          <Button
            clicked={props.toggleFilter}
            btnType="OpenFilter"
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
              {propertiesList?.length} places to stay{" "}
              <img src={arrow} alt="Arrow2" />
            </p>
          ) : (
            <p className={classes.PcResults}>
              {propertiesList?.length} results
            </p>
          )}
        </div>
      </div>
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
