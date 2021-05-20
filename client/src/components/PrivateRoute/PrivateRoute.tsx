import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { StoreState } from "../../store/configureStore";

interface Props {
  component: React.FC;
  path: string;
}
export const UserRoute: React.FC<Props> = ({ component, path, ...rest }) => {
  const { isLoading, isAuthenticated, token } = useSelector(
    (state: StoreState) => state.user
  );

  if (isLoading) {
    // TODO: spinner
    return <div>Loading</div>;
  } else {
    return isAuthenticated && token ? (
      <Route exact path={path} component={component} {...rest} />
    ) : (
      <Redirect to={"/login"} />
    );
  }
};
