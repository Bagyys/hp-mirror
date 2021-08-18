import { useEffect, useState, useMemo, useCallback } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { StoreState } from '../../store/configureStore';
import { PropertyState } from '../../store/reducers/propertyReducer';
import { ErrorState } from '../../store/reducers/errorReducer';
import { PropertyInterface } from '../../store/types/propertyInterfaces';
import { getAllPropertiesAction } from '../../store/actions/propertyActions';
import { clearErrorAction } from '../../store/actions/errorActions';
import classes from './flats.module.scss';
import filterImg from '../../assets/images/filter.png';
import Flat from './Flat/Flat';
import Pagination from '../Pagination/Pagination';
import QuickViewFlat from './QuickViewFlat/QuickViewFlat';
import arrow from '../../assets/images/arrow2.png';
import { fakeData } from '../../fakeData/data';
import Button from '../Button/button';
const PageSize = 6;

interface FlatsProps {
  toggleHandler: () => void;
}
const Flats: React.FC<FlatsProps> = (props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quickViewFlat, setQuickViewFlat] = useState<PropertyInterface | null>(
    null
  );
  const [favorites, setFavorites] = useState<Array<PropertyInterface>>([]);
  const isMobile = useMediaPredicate('(max-width: 675px)');
  const history = useHistory();
  const currentPaginationData = useMemo(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setQuickViewFlat(null);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return fakeData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  const dispatch = useDispatch();

  const propertyStore: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const properties: Array<PropertyInterface> = propertyStore.properties;

  const errorState: ErrorState = useSelector(
    (state: StoreState) => state.error
  );
  const { error } = errorState;

  useEffect(() => {
    dispatch(getAllPropertiesAction());
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

  let isInFavorites = (id: string, arr: Array<PropertyInterface>) => {
    return arr.some((item) => item._id === id);
  };

  const favoritesHandler = (id: string) => {
    let newArr = [...favorites];
    let isFavorites = isInFavorites(id, newArr);
    let property = fakeData.find((item) => item._id === id);
    if (property) {
      isFavorites
        ? (newArr = newArr.filter((item) => item._id !== id))
        : newArr.push(property);
    }
    setFavorites(newArr);
  };
  const mobileClickHandler = (id: string) => {
    if (isMobile) {
      history.push({
        pathname: `/flat/${id}`,
        state: { property: fakeData.find((item) => item._id === id) },
      });
    }
  };
  const QuickViewHandler = useCallback(
    (id: string) => {
      let newData = currentPaginationData.find((item) => item._id === id);
      newData ? setQuickViewFlat(newData) : setQuickViewFlat(null);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    [quickViewFlat]
  );
  let propertiesRender = <></>;
  if (properties) {
    propertiesRender = (
      <ul className={classes.FlatsListConatiner}>
        {currentPaginationData
          .filter((item) => item._id !== quickViewFlat?._id)
          .map((property: PropertyInterface, index: number) => {
            return (
              <Flat
                mobileClickHandler={() => mobileClickHandler(property._id)}
                hide={quickViewFlat && index > 3}
                clicked={() => QuickViewHandler(property._id)}
                key={property._id}
                property={property}
                clickedLike={() => favoritesHandler(property._id)}
                liked={isInFavorites(property._id, favorites)}
              />
            );
          })}
      </ul>
    );
  }
  let recentlyViewPropertiesRender = <></>;
  if (!isMobile) {
    const recentlyView = fakeData.slice(-2); //tiesiog isvedu paskutinius apartamentus
    if (recentlyView) {
      recentlyViewPropertiesRender = (
        <ul className={classes.FlatsListConatiner}>
          {recentlyView.map((property: PropertyInterface, index: number) => (
            <Flat
              clickedLike={() => favoritesHandler(property._id)}
              liked={isInFavorites(property._id, favorites)}
              recentlyView={true}
              key={property._id}
              property={property}
            />
          ))}
        </ul>
      );
    }
  }

  return (
    <div className={classes.FlatsContainer}>
      <div className={classes.FlatsContainerNav}>
        <Button clicked={props.toggleHandler} btnType="Filter">
          <img src={filterImg} />
        </Button>
        <p className={classes.PcResults}>{fakeData.length} results</p>
        <p className={classes.MobileResults}>
          {fakeData.length} places to stay <img src={arrow} alt="Arrow2" />
        </p>
      </div>
      {quickViewFlat && <QuickViewFlat property={quickViewFlat} />}
      {propertiesRender}
      {!isMobile && (
        <>
          <Pagination
            currentPage={currentPage}
            totalCount={fakeData.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />

          <div className={classes.RecentlyViewContainer}>
            <h2>Recently viewed</h2>
            {recentlyViewPropertiesRender}
          </div>
        </>
      )}
    </div>
  );
};

export default Flats;
