import { Route, Switch } from "react-router-dom";

import Navigation from "../components/Navigation/navigation";
import { UserRoute } from "../components/PrivateRoute/PrivateRoute";
import Register from "../routes/Register/Register";
import Login from "../routes/Login/Login";
import FlatReview from "../routes/FlatReview/FlatView";
import Reservations from "../routes/Reservations/Reservations";
import Home from "./Home/home";
function Routes() {
  return (
    <div>
      <Navigation />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/flat/:id" component={FlatReview} />
        <UserRoute path="/reservations" component={Reservations} />
      </Switch>
    </div>
  );
}

export default Routes;
