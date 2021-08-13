import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { StoreState } from '../../store/configureStore';
import { userState } from '../../store/reducers/userReducer';
// import { errorState } from "../../store/reducers/errorReducer";
import { loadUser, logoutAction } from '../../store/actions/userActions';
import FavoriteImg from '../../assets/images/Favorite.svg';
import GuideImg from '../../assets/images/Guide.svg';
import BurgerMenu from '../../assets/images/menu.png';
import LogoImg from '../../assets/images/Logo.svg';
import userImg from '../../assets/images/Profile.svg';
import UserPic from '../../assets/images/UserPicture.svg';
import logout from '../../assets/images/logout.png';
import register from '../../assets/images/register.png';
import NavRoutes from './NavRoutes/NavRoutes';
import Backdrop from '../Backdrop/Backdrop';
import searchImg from '../../assets/images/Search.svg';
import classes from './navigation.module.scss';

const Navigation = () => {
  const dispatch = useDispatch();
  const auth: userState = useSelector((state: StoreState) => state.user);
  // const errorState: errorState = useSelector(
  //   (state: StoreState) => state.error
  // );
  // const { error } = errorState;
  const { token, isAuthenticated, user } = auth;
  useEffect(() => {
    if (user && !user._id) {
      dispatch(loadUser());
    }
  }, []);

  useEffect(() => {}, [token, isAuthenticated]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  const openMobileMenu = () => {
    setIsOpen(true);
  };
  const closeMobileMenu = () => {
    setIsOpen(false);
  };
  return (
    <div className={classes.Navigation}>
      <div className={classes.NavigationWrapper}>
        <div className={classes.Left}>
          <div className={classes.Logo}>
            <Link to="/">
              <img src={LogoImg} alt="Logo" />
            </Link>
          </div>
          {/* <NavRoutes /> */}
        </div>
        <div className={classes.Middle}>
          <div>Anytime</div>
          <div className={classes.SearchBox}>
            <div className={classes.Date}>July 1 - July 7</div>
            <div className={classes.Guests}>2 guests</div>
            <div className={classes.SearchButton}>
              <img src={searchImg} alt="Search" />
            </div>
          </div>
        </div>
        <div className={classes.Right}>
          <div className={classes.Favorites}>
            <img src={FavoriteImg} alt="Favorites" />
          </div>
          <div className={classes.Guide}>
            <img src={GuideImg} alt="Favorites" />
            <p>City Guide</p>
          </div>
          {isAuthenticated && token ? (
            <>
              <div className={classes.Login}>
                <Link to="/settings">
                  <img
                    className={classes.navBtn}
                    src={userImg}
                    alt="Profile menu"
                  />
                  <img
                    className={classes.ProfilePicture}
                    src={UserPic}
                    alt="Profile picture"
                  />
                </Link>
              </div>
              <div className={classes.Logout} onClick={handleSignOut}>
                <Link to="/">
                  <img
                    className={classes.navBtn}
                    src={logout}
                    alt="LogoutPic"
                  />
                </Link>
              </div>
              <div className={classes.Languages}>
                <p>EN</p>
              </div>
            </>
          ) : (
            <>
              <div className={classes.Register}>
                <Link to="/register">
                  <p>Become host</p>
                </Link>
              </div>
              <div className={classes.Login}>
                <Link to="/login">
                  <p>Sign in</p>
                </Link>
              </div>
            </>
          )}
          <div className={classes.Menu}>
            <img src={BurgerMenu} alt="Menu" onClick={openMobileMenu} />

            <Backdrop isVisible={isOpen} toggleHandler={closeMobileMenu}>
              <div className={classes.Close} onClick={closeMobileMenu}>
                X
              </div>
              <Link
                className={classes.MobileLink}
                onClick={closeMobileMenu}
                to="/reservations"
              >
                Reservations
              </Link>
              <Link
                className={classes.MobileLink}
                onClick={closeMobileMenu}
                to="/favorites"
              >
                Favorites
              </Link>
              <Link
                className={classes.MobileLink}
                onClick={closeMobileMenu}
                to="/history"
              >
                History
              </Link>
              <Link
                className={classes.MobileLink}
                onClick={closeMobileMenu}
                to="/settings"
              >
                Settings
              </Link>
              <Link
                className={classes.MobileLink}
                onClick={closeMobileMenu}
                to="/locks"
              >
                Locks
              </Link>
            </Backdrop>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
