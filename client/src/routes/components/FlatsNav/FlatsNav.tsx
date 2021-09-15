import { cn } from '../../../utilities/joinClasses';
import Button from '../Button/button';
import classes from './FlatsNav.module.scss';
import filterImg from '../../../assets/images/filter.png';
import arrow from '../../../assets/images/arrow2.png';
import { useMediaPredicate } from 'react-media-hook';
interface FlatNavProps {
  filterOpen: () => void;
  pageSize: number;
  pageSizeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isMain: boolean;
  numberOfApartaments: number;
}
const FlatsNav: React.FC<FlatNavProps> = (props) => {
  const isMobile = useMediaPredicate('(max-width: 675px)');
  return (
    <div
      className={cn(
        classes.FlatsContainerNav,
        props.isMain
          ? classes.FlatsContainerNavMain
          : classes.FlatsContainerNavFavorite
      )}
    >
      <div
        style={props.isMain && isMobile ? { display: 'none' } : {}}
        className={classes.FilterBtnContainer}
      >
        <Button clicked={props.filterOpen} btnType="OpenFilter" bgColor="Grey">
          <img src={filterImg} />
        </Button>
        {!props.isMain && <h1>Favorites</h1>}
      </div>
      <div className={classes.RightSide}>
        {props.isMain && (
          <div className={classes.CustomSelect}>
            <select onChange={props.pageSizeHandler} value={props.pageSize}>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
            </select>
          </div>
        )}

        {props.isMain && isMobile ? (
          <p className={classes.MobileResults}>
            {props.numberOfApartaments} places to stay{' '}
            <img src={arrow} alt="Arrow2" />
          </p>
        ) : (
          <p className={classes.PcResults}>
            {props.numberOfApartaments} results
          </p>
        )}
      </div>
    </div>
  );
};
export default FlatsNav;
