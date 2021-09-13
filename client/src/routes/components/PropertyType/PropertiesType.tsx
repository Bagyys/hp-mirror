import classes from './PropertiesType.module.scss';
const PropertiesType: React.FC = ({ children }) => (
  <p className={classes.ApartamentType}>{children}</p>
);
export default PropertiesType;
