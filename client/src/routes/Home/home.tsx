import Flats from '../../components/Flats/Flats';
import Map from '../../components/Map/map';
import { useMediaPredicate } from 'react-media-hook';
import SecondaryNavMobile from '../components/SecondaryNavMobile/SecondaryNavMobile';
import Main from '../../components/Main/main';
import classes from './home.module.scss';
import { cn } from '../../utilities/joinClasses';
import Navigation from '../../components/Navigation/navigation';
import Footer from '../../components/Footer/Footer';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/configureStore';
import { PropertyState } from '../../store/reducers/propertyReducer';
import { getAllPropertiesAction, resetPropertyCordsAction } from '../../store/actions/propertyActions';
import { FilterState } from '../../store/reducers/filterReducer';
import SideFilter from '../../components/SideFilter/SideFilter';
import { toggleFilterButtonAction } from '../../store/actions/filterActions';
const isChoosing = false;
function Home() {
  const dispatch = useDispatch();
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const { searchedDayList, guests } = mainPage;
  const propertyStore: PropertyState = useSelector((state: StoreState) => state.property);
  const { quickViewPropertyId } = propertyStore;
  const filterSide: FilterState = useSelector((state: StoreState) => state.filter);

  const { formData, isFilterOpen } = filterSide;
  const isMobile = useMediaPredicate('(max-width: 675px)');
  const toggleFilterHandler = () => {
    dispatch(toggleFilterButtonAction(!isFilterOpen));
  };
  // localStorage.removeItem('persist:root');
  useEffect(() => {
    //is karto filtruoja ar butai laisvi ir atitinka gyventoju skaiciu paemus duomenis is API, taip pat cia filtruojami sideFilter duomenys, nezinau ar tinka?
    dispatch(getAllPropertiesAction(searchedDayList, guests, formData));
    dispatch(resetPropertyCordsAction());
  }, [searchedDayList, formData, dispatch, guests]);

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
                toggleFilter={toggleFilterHandler}
              />
            )}

            <div
              className={cn(
                classes.ContentBox,
                quickViewPropertyId ? classes.MobileContentToTop : classes.MobileContent
              )}>
              <Flats />
              <div className={classes.MapContainer}>
                <Map />
              </div>
            </div>
            <Footer />
            <SideFilter />
          </Fragment>
        )}
      </div>
    </>
  );
}

export default Home;
