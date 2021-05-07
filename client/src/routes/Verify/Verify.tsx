import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";

import { StoreState } from "../../store/configureStore";
import { userState } from "../../store/reducers/userReducer";
import { verifyAction } from "../../store/actions/userActions";

const Verify = () => {
  const dispatch = useDispatch();
  const params = useParams<{ token: string }>();
  const auth: userState = useSelector((state: StoreState) => state.user);

  useEffect(() => {
    if (params.token !== undefined) {
      dispatch(verifyAction(params.token));
    }
  }, []);

  if (auth.isLoading) {
    return <div>... Loading ... </div>;
  } else {
    return <Redirect to={"/"} />;
  }
};

export default Verify;
