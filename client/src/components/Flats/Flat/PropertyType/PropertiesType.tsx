import classes from './PropertiesType.module.scss';
interface PropertyType {
  type: string;
}
const PropertiesType: React.FC<PropertyType> = (props) => (
  <p className={classes.ApartamentType}>{props.type}</p>
);
export default PropertiesType;
