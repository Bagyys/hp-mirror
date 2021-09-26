import React, { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router';
import { useMediaPredicate } from 'react-media-hook';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { StoreState } from '../../store/configureStore';
import { PropertyState } from '../../store/reducers/propertyReducer';
import { ErrorState } from '../../store/reducers/errorReducer';
import {
  activePropertyCordsAction,
  addRecentlyViewedAction,
  currentPageAction,
  myBookingQuickViewAction,
  quickViewAction,
  resetPropertyCordsAction,
} from '../../store/actions/propertyActions';
import { clearErrorAction } from '../../store/actions/errorActions';
import classes from './flats.module.scss';
import Pagination from '../Pagination/Pagination';
import { userState } from '../../store/reducers/userReducer';
import { addToFavoriteAction } from '../../store/actions/userActions';
import { cn } from '../../utilities/joinClasses';
import { filterArrayById, recentlyViewedObj } from '../../utilities/flatsFunctions';
import { toggleFilterButtonAction } from '../../store/actions/filterActions';
import FlatsNav from './FlatsNav/FlatsNav';
import FlatsList from './FlatsList/FlatsList';
import MyBookingsList from './MyBookingsList/MyBookingsList';
import RecentlyViewedList from './RecentlyViewedList/RecentlyViewedList';

const Flats: React.FC = (props) => {
  const isMobile = useMediaPredicate('(max-width: 675px)');
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const auth: userState = useSelector((state: StoreState) => state.user);
  const { user } = auth;
  const propertyStore: PropertyState = useSelector((state: StoreState) => state.property);
  const {
    quickViewPropertyId,
    myBookingQuickViewId,
    pageSizeMain,
    currentPage,
    pageSizeFavorite,
    properties,
    recentlyViewedProperties,
  } = propertyStore;
  const errorState: ErrorState = useSelector((state: StoreState) => state.error);
  const { error } = errorState;

  const propertiesList = useMemo(
    () => (location.pathname === '/' ? properties : filterArrayById(properties, user.favorites)),
    [location.pathname, user.favorites, properties]
  );

  useEffect(() => {
    dispatch(quickViewAction(''));
    dispatch(resetPropertyCordsAction());
  }, [currentPage, pageSizeMain]);

  useEffect(() => {
    dispatch(currentPageAction(1));
    dispatch(myBookingQuickViewAction(''));
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

  const favoritesHandler = (id: string) => {
    dispatch(addToFavoriteAction(id));
  };

  const quickViewHandler = (id: string, cord: { lat: number; lng: number }) => {
    location.pathname === '/' && dispatch(activePropertyCordsAction(cord));
    dispatch(quickViewAction(id));
    //pridedam apartamentus i recentlyViewed, kai padarom quick view ant apartamentu, ar reikia ieiti i apartamentus, kad tai atlikti ???
    dispatch(addRecentlyViewedAction(recentlyViewedObj(recentlyViewedProperties, id)));
    !(location.pathname === '/') && scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const closeQuickViewHandler = () => {
    dispatch(quickViewAction(''));
    dispatch(resetPropertyCordsAction());
    !(location.pathname === '/') && scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={cn(
        classes.FlatsContainer,
        location.pathname === '/' ? classes.FlatsContainerMain : classes.FlatsContainerFavorite
      )}>
      <FlatsNav
        pageSize={pageSizeMain}
        numberOfApartaments={propertiesList?.length}
        isMain={location.pathname === '/'}
        filterOpen={() => dispatch(toggleFilterButtonAction(true))}
      />
      {/* Nezinau ar props paduoti ar redux componente naudoti ar is vis geriau nereikejo iskelti */}
      {!(location.pathname === '/') && (
        <MyBookingsList
          isMobile={isMobile}
          myBookingQuickViewId={myBookingQuickViewId}
          //tiesiog isvedu vienus apartamentus test
          properties={properties.slice(0, 1)}
        />
      )}
      {/* Nezinau ar props paduoti ar redux componente naudoti ar is vis geriau nereikejo iskelti */}
      <FlatsList
        properties={propertiesList}
        isMain={location.pathname === '/'}
        favorites={user.favorites}
        isMobile={isMobile}
        quickViewPropertyId={quickViewPropertyId}
        currentPage={currentPage}
        pageSizeMain={pageSizeMain}
        pageSizeFavorite={pageSizeFavorite}
        favoritesHandler={favoritesHandler}
        closeQuickViewHandler={closeQuickViewHandler}
        quickViewHandler={quickViewHandler}
        ref={scrollRef}
      />
      {!isMobile && (
        <React.Fragment>
          {/* Nezinau ar props paduoti ar redux componente naudoti  */}
          <Pagination
            currentPage={currentPage}
            totalCount={
              propertiesList?.length -
              (quickViewPropertyId === '' ||
              pageSizeMain - (pageSizeMain * currentPage - propertiesList.length) === 1
                ? 0
                : 1)
            }
            pageSize={location.pathname === '/' ? pageSizeMain : pageSizeFavorite}
            onPageChange={(page) => dispatch(currentPageAction(page))}
          />
          {/* Nezinau ar props paduoti ar redux componente naudoti ar is vis geriau nereikejo iskelti */}
          {/*kur turi atsirasti quickview kortele paspaudus ant recently viewed apartamentu favorite page? ??? */}
          <RecentlyViewedList
            properties={filterArrayById(
              properties,
              location.pathname === '/' ? recentlyViewedProperties.main : recentlyViewedProperties.favorite
            ).reverse()}
            isMain={location.pathname === '/'}
            favorites={user.favorites}
            favoritesHandler={favoritesHandler}
            quickViewHandler={quickViewHandler}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default React.memo(Flats);
