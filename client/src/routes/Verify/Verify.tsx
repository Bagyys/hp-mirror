import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import {
  verifyAction,
  clearErrorAction,
} from "../../store/actions/userActions";

import Spinner from "../../components/Spinner/Spinner";

const Verify = () => {
  const dispatch = useDispatch();
  const params = useParams<{ token: string }>();
  const { isLoading, error } = useSelector((state: StoreState) => state.user);

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
