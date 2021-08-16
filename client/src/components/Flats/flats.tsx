import { useEffect, useState, useMemo, useCallback } from 'react';
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
import { fakeData } from '../../fakeData/data';
const PageSize = 6;
interface FlatsProps {
  toggleHandler: () => void;
}
const Flats: React.FC<FlatsProps> = (props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quickViewFlat, setQuickViewFlat] = useState<PropertyInterface | null>(
    null
  );

  const currentTableData = useMemo(() => {
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

  const QuickViewHandler = useCallback(
    (id: string) => {
      let newData = currentTableData.find((item) => item._id === id);
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
        {currentTableData
          .filter((item) => item._id !== quickViewFlat?._id)
          .map((property: PropertyInterface, index: number) => {
            return (
              <Flat
                hide={quickViewFlat && index > 3}
                clicked={() => QuickViewHandler(property._id)}
                key={property._id}
                property={property}
              />
            );
          })}
      </ul>
    );
  }
  let recentlyViewPropertiesRender = <></>;
  const recentlyView = fakeData.slice(-2); //tiesiog isvedu paskutinius apartamentus
  if (recentlyView) {
    recentlyViewPropertiesRender = (
      <ul className={classes.FlatsListConatiner}>
        {recentlyView.map((property: PropertyInterface, index: number) => (
          <Flat key={property._id} property={property} />
        ))}
      </ul>
    );
  }
  return (
    <div className={classes.FlatsContainer}>
      <div className={classes.FlatsContainerNav}>
        <div onClick={props.toggleHandler} className={classes.FilterContainer}>
          <img src={filterImg} />
        </div>
        <p>{fakeData.length} results</p>
      </div>
      {quickViewFlat && <QuickViewFlat property={quickViewFlat} />}
      {propertiesRender}
      <Pagination
        currentPage={currentPage}
        totalCount={fakeData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <h2>Recently viewed</h2>
      {recentlyViewPropertiesRender}
    </div>
  );
};

export default Flats;
