import classes from './Favorite.module.scss';
import arrow from '../../assets/images/arrow2.png';
import Navigation from '../../components/Navigation/navigation';
import Flat from '../../components/Flats/Flat/Flat';
import { useHistory } from 'react-router-dom';
import { fakeData } from '../../fakeData/data';
import { isStringInArray } from '../../utilities/isStringInArray';
import { useDispatch, useSelector } from 'react-redux';
import { userState } from '../../store/reducers/userReducer';
import { StoreState } from '../../store/configureStore';
import { addToFavoriteAction } from '../../store/actions/userActions';
const Favorite = () => {
  const auth: userState = useSelector((state: StoreState) => state.user);
  const dispatch = useDispatch();
  const { token, isAuthenticated, user } = auth;
  const history = useHistory();

  const favoritesHandler = (id: string) => {
    dispatch(addToFavoriteAction(id, user.favorites));
  };
  let propertiesRender = <></>;
  if (user.favorites) {
    const favoriteList = fakeData.filter((item) => {
      return user.favorites.includes(item._id);
    });
    propertiesRender = (
      <ul className={classes.FlatsListConatiner}>
        {favoriteList.map((property) => {
          return (
            <Flat
              mobileClickHandler={() => mobileClickHandler(property._id)}
              key={property._id}
              property={property}
              favoritePage={true}
              clickedLike={() => favoritesHandler(property._id)}
              liked={isStringInArray(property._id, user.favorites)}
            />
          );
        })}
      </ul>
    );
    const mobileClickHandler = (id: string) => {
      history.push({
        pathname: `/flat/${id}`,
        state: { property: favoriteList.find((item) => item._id === id) },
      });
    };
  }
  return (
    <>
      <Navigation />
      <div className={classes.FavoriteContainer}>
        <div onClick={() => history.goBack()} className={classes.Return}>
          <img src={arrow} />
          Return to list
        </div>
        <h2>Favorites</h2>
        <div className={classes.FavoriteFlats}>{propertiesRender}</div>
      </div>
    </>
  );
};
export default Favorite;
