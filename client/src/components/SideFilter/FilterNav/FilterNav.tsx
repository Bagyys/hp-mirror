import Button from '../../../routes/components/Button/button';
import classes from './FilterNav.module.scss';
import close from '../../../assets/images/close.png';
interface FilterNavProps {
  close: () => void;
  save: () => void;
  clear: () => void;
}
const FilterNav: React.FC<FilterNavProps> = (props) => (
  <div className={classes.SideFilterNav}>
    <Button clicked={props.close} btnType="CloseFilter" bgColor="Grey">
      <img src={close} />
      <span>Close</span>
    </Button>
    <div className={classes.ButtonsContainer}>
      <Button clicked={props.clear} btnType="ClearFilter">
        Clear
      </Button>
      <Button clicked={props.save} btnType="SaveFilter" bgColor="Black">
        Save
      </Button>
    </div>
  </div>
);
export default FilterNav;
