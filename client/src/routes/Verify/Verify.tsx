import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import { ErrorState } from "../../store/reducers/errorReducer";
import { verifyAction } from "../../store/actions/userActions";
import { clearErrorAction } from "../../store/actions/errorActions";

import Spinner from "../../components/Spinner/Spinner";

const Verify = () => {
  const dispatch = useDispatch();
  const params = useParams<{ token: string }>();
  const { isLoading } = useSelector((state: StoreState) => state.user);
  const errorState: ErrorState = useSelector(
    (state: StoreState) => state.error
  );
  const { error } = errorState;

  useEffect(() => {
    if (params.token !== undefined) {
      dispatch(verifyAction(params.token));
    }
  }, []);

  const handleError = () => {
    dispatch(clearErrorAction());
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: error,
        text: "Please try again",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      }).then(() => {
        handleError();
      });
    }
  }, [error]);

  if (isLoading) {
    return <Spinner />;
  } else {
    return <Redirect to={"/"} />;
  }
};

export default Verify;
