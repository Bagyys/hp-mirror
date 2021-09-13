import classes from './Favorites.module.scss';
import favoriteCard from '../../../assets/images/like_heart.png';
import favoriteCardHover from '../../../assets/images/like_heart_hover.png';
import favoriteMobile from '../../../assets/images/favorite_mobile.png';
interface FavoritesProps {
  liked?: boolean;
  clickedLike?: () => void;
}
const Favorites: React.FC<FavoritesProps> = (props) => (
  <div onClick={props.clickedLike} className={classes.LikeContainer}>
    <img className={classes.Like} src={favoriteCard} />
    <img className={classes.LikeMobile} src={favoriteMobile} />
    <img
      style={props.liked ? { display: 'block' } : {}}
      className={classes.LikeHover}
      src={favoriteCardHover}
    />
  </div>
);

export default Favorites;
