import classes from "./Favorite.module.scss";
import Navigation from "../../components/Navigation/navigation";
import { useMediaPredicate } from "react-media-hook";
import { useHistory } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import React from "react";
import Flats from "../../components/Flats/Flats";
import { FilterState } from "../../store/reducers/filterReducer";
import { StoreState } from "../../store/configureStore";
import { useSelector } from "react-redux";
import SideFilter from "../../components/SideFilter/SideFilter";
import ReturnToList from "../components/ReturnToList/ReturnToList";
const Favorite = () => {
  const isMobile = useMediaPredicate("(max-width: 675px)");
  const history = useHistory();
  const filterSide: FilterState = useSelector(
    (state: StoreState) => state.filter
  );

  const { isFilterOpen } = filterSide;
  return (
    <React.Fragment>
      <Navigation />
      <div className={classes.FavoriteContainer}>
        {isMobile && <ReturnToList goBack={() => history.goBack()} />}
        <Flats isMain={false} />
      </div>
      <Footer />
      {isFilterOpen && <SideFilter />}
    </React.Fragment>
  );
};
export default Favorite;
