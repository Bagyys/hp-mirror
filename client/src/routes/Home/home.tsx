import Flats from '../../components/Flats/flats';
import Map from '../../components/Map/map';
import { useMediaPredicate } from 'react-media-hook';
import SecondaryNavMobile from '../../components/SecondaryNavMobile/SecondaryNavMobile';
import Main from '../../components/Main/main';
import classes from './home.module.scss';
import { cn } from '../../utilities/joinClasses';
import Navigation from '../../components/Navigation/navigation';
import Footer from '../../components/Footer/Footer';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/configureStore';
import { PropertyState } from '../../store/reducers/propertyReducer';
import {
  getAllPropertiesAction,
  resetPropertyCordsAction,
} from '../../store/actions/propertyActions';
const isChoosing = false;
function Home() {
  const dispatch = useDispatch();
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const propertyStore: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const { quickViewPropertyId, activePropertyCord } = propertyStore;
  const isMobile = useMediaPredicate('(max-width: 675px)');
  // localStorage.removeItem('persist:root');
  useEffect(() => {
    dispatch(getAllPropertiesAction());
    dispatch(resetPropertyCordsAction());
  }, []);
  return (
    <>
      <div className={classes.App}>
        {mainPage.isChoosing ? (
          <Main />
        ) : (
          <Fragment>
            <Navigation />
            {isMobile && (
              <SecondaryNavMobile
                isQuickViewClicked={quickViewPropertyId !== ''}
              />
            )}

            <div
              className={cn(
                classes.ContentBox,
                quickViewPropertyId
                  ? classes.MobileContentToTop
                  : classes.MobileContent
              )}
            >
              <Flats isMain={true} />
              <Map  />
            </div>
            <Footer />
          </Fragment>
        )}
      </div>
    </>
  );
}

export default Home;
