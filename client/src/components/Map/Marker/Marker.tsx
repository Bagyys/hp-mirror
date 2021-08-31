import classes from './Marker.module.scss';
import { cn } from '../../../utilities/joinClasses';
interface MarkerProps {
  price?: number;
  lat: number;
  lng: number;
  // clicked: () => void;
  active: boolean;
  overlayViewDivStyle: any;
}
const Marker: React.FC<MarkerProps> = (props) => {
  return (
    <div
      // onClick={props.clicked}
      style={props.active ? { zIndex: 1 } : { zIndex: 0 }}
      className={cn(
        classes.MarkerContainer,
        props.active ? classes.Active : classes.Marker
      )}
    >
      {props.price}€
    </div>
  );
};
export default Marker;
