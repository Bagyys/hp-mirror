import classes from './FavoriteNav.module.scss';
interface FavoriteNavProps {
  img: string;
  classN: string;
}
const FavoriteNav: React.FC<FavoriteNavProps> = (props) => (
  <div className={classes[props.classN]}>
    <img src={props.img} alt="Favorites" />
  </div>
);

export default FavoriteNav;
