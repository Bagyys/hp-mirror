import React, { useEffect, useMemo, useRef } from 'react';
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
import {
  filterArrayById,
  recentlyViewedObj,
} from '../../utilities/flatsFunctions';
import { toggleFilterButtonAction } from '../../store/actions/filterActions';
import FlatsNav from './FlatsNav/FlatsNav';
import FlatsList from './FlatsList/FlatsList';
import MyBookingsList from './MyBookingsList/MyBookingsList';
import RecentlyViewedList from './RecentlyViewedList/RecentlyViewedList';

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
  const errorState: ErrorState = useSelector(
    (state: StoreState) => state.error
  );
  const { error } = errorState;

  const propertiesList = useMemo(
    () =>
      props.isMain ? properties : filterArrayById(properties, user.favorites),
    [props.isMain, user.favorites, properties]
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
  const currentPaginationData = useMemo(() => {
    props.isMain &&
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    const firstPageIndex =
      (currentPage - 1) * (props.isMain ? pageSizeMain : pageSizeFavorite);
    const lastPageIndex =
      firstPageIndex +
      (props.isMain ? pageSizeMain : pageSizeFavorite) +
      (quickViewPropertyId === '' ? 0 : 1);
    return propertiesList?.slice(firstPageIndex, lastPageIndex);
  }, [
    quickViewPropertyId,
    currentPage,
    pageSizeMain,
    pageSizeFavorite,
    propertiesList,
    props.isMain,
  ]);

  const favoritesHandler = (id: string) => {
    dispatch(addToFavoriteAction(id));
  };

  const quickViewHandler = (id: string, cord: { lat: number; lng: number }) => {
    props.isMain && dispatch(activePropertyCordsAction(cord));
    dispatch(quickViewAction(id));
    dispatch(
      addRecentlyViewedAction(recentlyViewedObj(recentlyViewedProperties, id))
    );
    !props.isMain && scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const closeQuickViewHandler = () => {
    dispatch(quickViewAction(''));
    dispatch(resetPropertyCordsAction());
    !props.isMain && scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
        numberOfApartaments={propertiesList?.length}
        isMain={props.isMain}
        filterOpen={() => dispatch(toggleFilterButtonAction(true))}
      />
      {/* Nezinau ar props paduoti ar redux componente naudoti ar is vis geriau nereikejo iskelti */}
      {!props.isMain && (
        <MyBookingsList
          isMobile={isMobile}
          myBookingQuickViewId={myBookingQuickViewId}
          //tiesiog isvedu vienus apartamentus test
          properties={properties.slice(0, 1)}
        />
      )}
      {/* Nezinau ar props paduoti ar redux componente naudoti ar is vis geriau nereikejo iskelti */}
      <FlatsList
        properties={currentPaginationData}
        isMain={props.isMain}
        favorites={user.favorites}
        isMobile={isMobile}
        quickViewPropertyId={quickViewPropertyId}
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
              pageSizeMain -
                (pageSizeMain * currentPage - propertiesList.length) ===
                1
                ? 0
                : 1)
            }
            pageSize={props.isMain ? pageSizeMain : pageSizeFavorite}
            onPageChange={(page) => dispatch(currentPageAction(page))}
          />
          {/* Nezinau ar props paduoti ar redux componente naudoti ar is vis geriau nereikejo iskelti */}
          <RecentlyViewedList
            properties={filterArrayById(
              properties,
              props.isMain
                ? recentlyViewedProperties.main
                : recentlyViewedProperties.favorite
            ).reverse()}
            isMain={props.isMain}
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
