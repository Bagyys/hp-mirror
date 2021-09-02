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
  currentPageAction,
  getAllPropertiesAction,
  pageSizeAction,
  quickViewAction,
} from "../../store/actions/propertyActions";
import { clearErrorAction } from "../../store/actions/errorActions";
import classes from "./flats.module.scss";
import filterImg from "../../assets/images/filter.png";
import Flat from "./Flat/Flat";
import Pagination from "../Pagination/Pagination";
import QuickViewFlat from "./QuickViewFlat/QuickViewFlat";
import arrow from "../../assets/images/arrow2.png";
import Button from "../Button/button";
import { isStringInArray } from "../../utilities/isStringInArray";
import { userState } from "../../store/reducers/userReducer";
import { addToFavoriteAction } from "../../store/actions/userActions";
import SideFilter from "../SideFilter/SideFilter";
import { FilterState } from "../../store/reducers/filterReducer";
import Backdrop from "../Backdrop/Backdrop";
import { toggleFilterButtonAction } from "../../store/actions/filterActions";
import { cn } from "../../utilities/joinClasses";

interface FlatsProps {
  properties: PropertyInterface[];
  isMain: boolean;
}
const Flats: React.FC<FlatsProps> = (props) => {
  const isMobile = useMediaPredicate("(max-width: 675px)");

  const dispatch = useDispatch();
  const auth: userState = useSelector((state: StoreState) => state.user);
  const { user } = auth;
  const filter: FilterState = useSelector((state: StoreState) => state.filter);
  const { isFilterOpen } = filter;
  const propertyStore: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const { quickViewPropertyId, pageSizeMain, currentPage, pageSizeFavorite } =
    propertyStore;
  const quickViewData = props.properties.find(
    (item) => item._id === quickViewPropertyId
  );

  const errorState: ErrorState = useSelector(
    (state: StoreState) => state.error
  );
  const { error } = errorState;

  useEffect(() => {
    dispatch(quickViewAction(""));
  }, [currentPage, pageSizeMain]);

  useEffect(() => {
    dispatch(getAllPropertiesAction());
    dispatch(currentPageAction(1));
  }, []);

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
    return props.properties.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSizeMain, pageSizeFavorite, props.properties]);

  const pageSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(pageSizeAction(Number(e.target.value)));
    dispatch(currentPageAction(1));
  };
  const favoritesHandler = (id: string) => {
    dispatch(addToFavoriteAction(id, user.favorites));
  };

  const QuickViewHandler = (id: string, cord: any) => {
    dispatch(activePropertyCordsAction(cord));
    dispatch(quickViewAction(id));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const toggleFilterHandler = () => {
    dispatch(toggleFilterButtonAction(!isFilterOpen));
  };
  let propertiesRender = <></>;
  if (props.properties.length > 0) {
    propertiesRender = (
      <React.Fragment>
        {!props.isMain && <h2>Your favorites</h2>}
        <ul className={classes.FlatsListConatiner}>
          {currentPaginationData
            .filter((item) => item._id !== propertyStore.quickViewPropertyId)
            .map((property: PropertyInterface) => {
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
            })}
        </ul>
      </React.Fragment>
    );
  }
  let recentlyViewPropertiesRender = <></>;
  if (!isMobile && props.properties.length > 0) {
    const recentlyView = props.isMain
      ? props.properties.slice(-2)
      : props.properties.slice(-4); //tiesiog isvedu paskutinius apartamentus
    recentlyViewPropertiesRender = (
      <div className={classes.RecentlyViewContainer}>
        <h2>Recently viewed</h2>
        <ul className={classes.FlatsListConatiner}>
          {recentlyView.map((property: PropertyInterface, index: number) => (
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
          <Button clicked={toggleFilterHandler} btnType="OpenFilter">
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
          <p className={classes.PcResults}>{props.properties.length} results</p>
          <p className={classes.MobileResults}>
            {props.properties.length} places to stay{" "}
            <img src={arrow} alt="Arrow2" />
          </p>
        </div>
      </div>
      {quickViewData && (
        <QuickViewFlat
          close={() => dispatch(quickViewAction(""))}
          property={quickViewData}
        />
      )}
      {propertiesRender}
      {!isMobile && (
        <>
          <Pagination
            currentPage={currentPage}
            totalCount={props.properties.length}
            pageSize={props.isMain ? pageSizeMain : pageSizeFavorite}
            onPageChange={(page) => dispatch(currentPageAction(page))}
          />

          {recentlyViewPropertiesRender}
        </>
      )}
      {isFilterOpen && <SideFilter toggleHandler={toggleFilterHandler} />}
      {!isMobile && isFilterOpen && (
        <Backdrop
          isVisible={isFilterOpen}
          toggleHandler={toggleFilterHandler}
        ></Backdrop>
      )}
    </div>
  );
};

export default Flats;
