import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import { ErrorState } from "../../store/reducers/errorReducer";
import { LockProps } from "../../store/types/lockInterfaces";
import {
  openLockAction,
  resetLockAction,
  deleteLockAction,
} from "../../store/actions/lockActions";
import { clearErrorAction } from "../../store/actions/errorActions";

import classes from "./Lock.module.scss";
import { useEffect } from "react";

interface Props {
  index: number;
}

const Lock: React.FC<Props> = ({ index }) => {
  const dispatch = useDispatch();
  const lock: LockProps = useSelector(
    (state: StoreState) => state.lock.locks[index]
  );

  const errorState: ErrorState = useSelector(
    (state: StoreState) => state.error
  );
  const { error } = errorState;

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

  const disableButtons = lock.o1 === 1 || lock.o2 === 1 ? true : false;
  const doorAction = (index: number, lockId: string, door: string) => {
    dispatch(openLockAction(index, lockId, door));
  };

  const resetAction = (index: number, lockId: string) => {
    dispatch(resetLockAction(index, lockId));
  };

  const deleteAction = (lockId: string) => {
    if (lockId) {
      Swal.fire({
        title: "Do you really want to delete this lock?",
        text: lockId,
        icon: "warning",
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(deleteLockAction(lockId));
          Swal.fire("Succesfully deleted", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Lock is not deleted", "", "info");
        }
      });
    }
  };

  return (
    <div className={classes.Lock}>
      <div className={classes.LockInfo}>
        <p>
          - Lock id: {lock._id} - | - Property:{" "}
          {lock.propertyFull
            ? `${lock.propertyFull.title}, ${lock.propertyFull.location.country}`
            : ""}
        </p>
      </div>

      <div className={classes.Buttons}>
        <button
          disabled={disableButtons}
          onClick={() => doorAction(index, lock._id, "o1")}
        >
          Open front lock
        </button>
        <button
          disabled={disableButtons}
          onClick={() => doorAction(index, lock._id, "o2")}
        >
          Open flat lock
        </button>
        <button onClick={() => resetAction(index, lock._id)}>Reset lock</button>
        <button
          className={classes.delete}
          onClick={() => deleteAction(lock._id)}
        >
          Delete lock
        </button>
      </div>
    </div>
  );
};
export default Lock;
