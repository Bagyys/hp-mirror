import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cn } from '../../utilities/joinClasses';
import { StoreState } from '../../store/configureStore';
import { userState } from '../../store/reducers/userReducer';
import SearchBox from './SearchBox/SearchBox';
import FavoriteNav from './FavoriteNav/FavoriteNav';
// import { errorState } from "../../store/reducers/errorReducer";
import { loadUser, logoutAction } from '../../store/actions/userActions';
import favoritePc from '../../assets/images/Favorite.svg';
import GuideImg from '../../assets/images/Guide.svg';
import BurgerMenu from '../../assets/images/menu.png';
import LogoImg from '../../assets/images/Logo.svg';
import UserPic from '../../assets/images/UserPicture.svg';
import favoriteMobile from '../../assets/images/favorite2.png';
import logout from '../../assets/images/logout.png';
import register from '../../assets/images/register.png';
import NavRoutes from './NavRoutes/NavRoutes';
import Backdrop from '../Backdrop/Backdrop';
import classes from './navigation.module.scss';

const Navigation = () => {
  const [sliderToggle, setSliderToggle] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const handleSignOut = () => {
    setIsOpen(false);
    setSliderToggle(false);
    dispatch(logoutAction());
  };
  const menuHandler = () => {
    setSliderToggle(!sliderToggle);
    setIsOpen(!isOpen);
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
          <SearchBox />
        </div>
        <div className={classes.Right}>
          <FavoriteNav img={favoritePc} classN="FavoritePc" />

          <div className={classes.Guide}>
            <img src={GuideImg} alt="Favorites" />
            <p>City Guide</p>
          </div>
          {/* {isAuthenticated && token ? (
            <> */}
          <div className={classes.NavMenuBtn}>
            <div onClick={menuHandler} className={classes.Slider}>
              <div className={classes.Burger}></div>
              <div
                className={cn(
                  classes.SliderItem,
                  sliderToggle ? classes.SlideOpen : ''
                )}
              >
                {isAuthenticated && token && (
                  <img src={UserPic} alt="Profile picture" />
                )}
              </div>
            </div>
            {isOpen && (
              <div className={classes.MenuContainer}>
                {isAuthenticated && token ? (
                  <div onClick={handleSignOut}>
                    <Link to="/">Logout</Link>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Sign Up</Link>
                  </div>
                )}
                <div className={classes.HostHome}>
                  <Link to="#">Host your home</Link>
                </div>
                <div>
                  <Link to="#">About us</Link>
                  <Link to="#">Contacts</Link>
                </div>
              </div>
            )}
            {/* <Link to="/settings">
                  <img
                    className={classes.NavBtn}
                    src={userImg}
                    alt="Profile menu"
                  />
                  <img
                    className={classes.ProfilePicture}
                    src={UserPic}
                    alt="Profile picture"
                  />
                </Link> */}
          </div>
          {/* <div className={classes.Logout} onClick={handleSignOut}>
                <Link to="/">
                  <img
                    className={classes.navBtn}
                    src={logout}
                    alt="LogoutPic"
                  />
                </Link>
              </div> */}
          <div className={classes.Languages}>
            <p>EN</p>
          </div>
          {/* </>
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
          )} */}
          {/* <div className={classes.Menu}>
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
