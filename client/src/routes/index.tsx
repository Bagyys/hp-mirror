import { Route, Switch } from "react-router-dom";

import { UserRoute } from "../components/PrivateRoute/PrivateRoute";
import Navigation from "../components/Navigation/navigation";
import Home from "./Home/home";
import Register from "../routes/Register/Register";
import SendVerify from "../routes/SendVerify/SendVerify";
import Verify from "../routes/Verify/Verify";
import Login from "../routes/Login/Login";
import FlatReview from "../routes/FlatReview/FlatView";
import Reservations from "../routes/Reservations/Reservations";
import Settings from "../routes/Settings/Settings";

const Routes = () => {
  return (
    <div>
      <Navigation />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/flat/:id" component={FlatReview} />
        <Route path="/verify/:token" component={Verify} />
        <UserRoute path="/send-verify" component={SendVerify} />
        <UserRoute path="/reservations" component={Reservations} />
        <UserRoute path="/settings" component={Settings} />
      </Switch>
    </div>
  );
};

export default Routes;
