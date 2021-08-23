import { useEffect, useState, useMemo } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useDispatch, useSelector } from 'react-redux';
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
import { isStringInArray } from '../../utilities/isStringInArray';
import { userState } from '../../store/reducers/userReducer';
import { addToFavoriteAction } from '../../store/actions/userActions';

interface FlatsProps {
  toggleHandler: () => void;
}
const Flats: React.FC<FlatsProps> = (props) => {
  const [pageSize, setPageSize] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quickViewFlat, setQuickViewFlat] = useState<PropertyInterface | null>(
    null
  );
  const isMobile = useMediaPredicate('(max-width: 675px)');
  const currentPaginationData = useMemo(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setQuickViewFlat(null);
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return fakeData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize]);
  const dispatch = useDispatch();
  const auth: userState = useSelector((state: StoreState) => state.user);
  const { token, isAuthenticated, user } = auth;

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
  const pageSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };
  const favoritesHandler = (id: string) => {
    dispatch(addToFavoriteAction(id, user.favorites));
  };

  const QuickViewHandler = (id: string) => {
    let newData = currentPaginationData.find((item) => item._id === id);
    newData ? setQuickViewFlat(newData) : setQuickViewFlat(null);
    window.scrollTo({
      top: isMobile ? 60 : 0,
      behavior: 'smooth',
    });
  };
  // console.log(user);
  let propertiesRender = <></>;
  if (fakeData) {
    propertiesRender = (
      <ul className={classes.FlatsListConatiner}>
        {currentPaginationData
          .filter((item) => item._id !== quickViewFlat?._id)
          .map((property: PropertyInterface, index: number) => {
            return (
              <Flat
                quickViewClicked={() => QuickViewHandler(property._id)}
                key={property._id}
                property={property}
                clickedLike={() => favoritesHandler(property._id)}
                liked={isStringInArray(
                  property._id,
                  user !== null ? user.favorites : []
                )}
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
              liked={isStringInArray(property._id, user.favorites)}
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
        <div className={classes.FilterBtnContainer}>
          <Button clicked={props.toggleHandler} btnType="OpenFilter">
            <img src={filterImg} />
          </Button>
        </div>
        <div className={classes.RightSide}>
          <div className={classes.CustomSelect}>
            <select onChange={pageSizeHandler} value={pageSize}>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
            </select>
          </div>
          <p className={classes.PcResults}>{fakeData.length} results</p>
          <p className={classes.MobileResults}>
            {fakeData.length} places to stay <img src={arrow} alt="Arrow2" />
          </p>
        </div>
      </div>
      {quickViewFlat && (
        <QuickViewFlat
          close={() => setQuickViewFlat(null)}
          property={quickViewFlat}
        />
      )}
      {propertiesRender}
      {!isMobile && (
        <>
          <Pagination
            currentPage={currentPage}
            totalCount={fakeData.length}
            pageSize={pageSize}
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
