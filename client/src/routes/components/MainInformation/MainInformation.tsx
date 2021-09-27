//Style
import classes from "./MainInformation.module.scss";
//Types
import { FacilitiesInterface } from "../../../store/types/propertyInterfaces";
//Utilities
import { cn } from "../../../utilities/joinClasses";
interface MainInformationProps {
  facilities: FacilitiesInterface;
  active: boolean;
}
const MainInformation: React.FC<MainInformationProps> = (props) => {
  return (
    <p className={cn(props.active ? classes.Active : classes.MainInformation)}>
      {props.facilities.beds
        ? props.facilities.beds > 1
          ? `${props.facilities.beds} beds`
          : `${props.facilities.beds} bed`
        : null}
      {props.facilities.kitchen ? " • kitchen" : null}
      {` • ${props.facilities.bathroomType} bath`}
      {props.facilities.terrace ? " • terrace" : null}
      {props.facilities.wifi ? " • WIFI" : null}
      {props.facilities.parking ? " • parking" : null}
    </p>
  );
};
export default MainInformation;
