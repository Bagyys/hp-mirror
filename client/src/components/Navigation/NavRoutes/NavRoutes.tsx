import { Link } from "react-router-dom";

import classes from "./NavRoutes.module.scss";

const NavRoutes = () => {
  return (
    <div className={classes.Routes}>
      <ul>
        <li>
          <Link to="/reservations">Reservations</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/locks">Locks</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavRoutes;
