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
import { useSelector } from "react-redux";
import { StoreState } from "../../store/configureStore";
import { PropertyState } from "../../store/reducers/propertyReducer";
function Home() {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const propertyStore: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const { properties, quickViewPropertyId } = propertyStore;
  const isMobile = useMediaPredicate("(max-width: 675px)");
  // localStorage.removeItem("persist:root");
  return (
    <>
      <div className={classes.App}>
        {mainPage.isChoosing ? (
          <Main />
        ) : (
          <Fragment>
            <Navigation />
            {isMobile && <SecondaryNavMobile />}

            <div
              className={cn(
                classes.ContentBox,
                quickViewPropertyId
                  ? classes.MobileContentToTop
                  : classes.MobileContent
              )}
            >
              <Flats properties={properties} isMain={true} />
              <Map />
            </div>
            <Footer />
          </Fragment>
        )}
      </div>
    </>
  );
}

export default Home;
