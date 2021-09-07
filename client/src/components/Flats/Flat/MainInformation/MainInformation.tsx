import classes from './MainInformation.module.scss';
import { FacilitiesInterface } from '../../../../store/types/propertyInterfaces';
interface MainInformationProps {
  facilities: FacilitiesInterface;
}
const MainInformation: React.FC<MainInformationProps> = (props) => {
  return (
    <p className={classes.MainInformation}>
      {props.facilities.beds
        ? props.facilities.beds > 1
          ? `${props.facilities.beds} beds`
          : `${props.facilities.beds} bed`
        : null}
      {props.facilities.kitchen ? ' • kitchen' : null}
      {` • ${props.facilities.bathroomType} bath`}
      {props.facilities.terrace ? ' • terrace' : null}
      {props.facilities.wifi ? ' • WIFI' : null}
      {props.facilities.parking ? ' • parking' : null}
    </p>
  );
};
export default MainInformation;
