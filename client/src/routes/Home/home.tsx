import Flats from "../../components/Flats/flats";
import Map from "../../components/Map/map";
import { useMediaPredicate } from "react-media-hook";
import Filter from "../../components/Filter/filter";
import SecondaryNavMobile from "../../components/SecondaryNavMobile/SecondaryNavMobile";
import Main from "../../components/Main/main";
import classes from "../../App.module.scss";
import Navigation from "../../components/Navigation/navigation";
import Footer from "../../components/Footer/Footer";
import { Fragment } from "react";
import Backdrop from "../../components/Backdrop/Backdrop";
import SideFilter from "../../components/SideFilter/SideFilter";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store/configureStore";
import { toggleFilterButtonAction } from "../../store/actions/filterActions";
import { FilterState } from "../../store/reducers/filterReducer";
import { toggleMenuButtonAction } from "../../store/actions/userActions";
const isChoosing = true;
function Home() {
  const dispatch = useDispatch();
  const filter: FilterState = useSelector((state: StoreState) => state.filter);
  const { isFilterOpen } = filter;
  const isMobile = useMediaPredicate("(max-width: 675px)");

  const toggleHandler = () => {
    dispatch(toggleFilterButtonAction(!isFilterOpen));
  };
  return (
    <div className={classes.App}>
      {/* If not used delete later with all component */}
      {/* <Filter /> */}
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
          <div className={classes.contentBox}>
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
