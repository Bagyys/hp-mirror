//Style
import classes from "./PropertiesType.module.scss";
//Utilities
import { cn } from "../../../utilities/joinClasses";
import { classicNameResolver } from "typescript";
interface ClassNames {
  active: boolean;
}

const PropertiesType: React.FC<ClassNames> = (
  props // {{children}}
) => (
  <div>
    <p
      className={cn(props.active ? classes.Active : classes.ApartamentType)}

      // className={classes.ApartamentType}
    >
      {props.children}
    </p>
  </div>
);
export default PropertiesType;
