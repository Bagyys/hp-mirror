import { Route, Switch } from "react-router-dom";
import Navigation from "../components/Navigation/navigation";
import FlatReview from "../routes/FlatReview/FlatView";
import Reservations from "../routes/Reservations/Reservations";
import Home from "./Home/home";

function Routes() {
  return (
    <div>
      <Navigation />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/flat/:id" component={FlatReview} />
        <Route path="/reservations" component={Reservations} />
      </Switch>
    </div>
  );
}

export default Routes;
