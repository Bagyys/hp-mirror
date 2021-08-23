import classes from './Area.module.scss';
interface AreaProps {
  district: string;
}
const Area: React.FC<AreaProps> = (props) => (
  <p className={classes.Area}>{props.district} area</p>
);
export default Area;
