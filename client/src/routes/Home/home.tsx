import Flats from "../../components/Flats/flats";
import Map from "../../components/Map/map";
import { useMediaPredicate } from "react-media-hook";
import SecondaryNavMobile from "../../components/SecondaryNavMobile/SecondaryNavMobile";
import Main from "../../components/Main/main";
import classes from "./home.module.scss";
import { cn } from "../../utilities/joinClasses";
import Navigation from "../../components/Navigation/navigation";
import Footer from "../../components/Footer/Footer";
import { Fragment } from "react";
import Backdrop from "../../components/Backdrop/Backdrop";
import SideFilter from "../../components/SideFilter/SideFilter";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store/configureStore";
import { toggleFilterButtonAction } from "../../store/actions/filterActions";
import { FilterState } from "../../store/reducers/filterReducer";
import { PropertyState } from "../../store/reducers/propertyReducer";
const isChoosing = true;
function Home() {
  const dispatch = useDispatch();
  const filter: FilterState = useSelector((state: StoreState) => state.filter);
  const properties: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const { quickViewPropertyId } = properties;
  const { isFilterOpen } = filter;
  const isMobile = useMediaPredicate("(max-width: 675px)");

  const toggleHandler = () => {
    dispatch(toggleFilterButtonAction(!isFilterOpen));
  };
  return (
    <div className={classes.App}>
      {isChoosing ? (
        <Main />
      ) : (
        <Fragment>
          <Navigation />
          {isMobile && <SecondaryNavMobile toggleHandler={toggleHandler} />}
          {isFilterOpen && <SideFilter toggleHandler={toggleHandler} />}
          {!isMobile && (
            <Backdrop
              isVisible={isFilterOpen}
              toggleHandler={toggleHandler}
            ></Backdrop>
          )}
          <div
            className={cn(
              classes.ContentBox,
              quickViewPropertyId
                ? classes.MobileContentToTop
                : classes.MobileContent
            )}
          >
            <Flats toggleHandler={toggleHandler} />
            <Map />
          </div>
          <Footer />
        </Fragment>
      )}
    </div>
  );
}

export default Home;
