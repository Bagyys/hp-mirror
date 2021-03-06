enum lockTypes {
  INIT_LOCKS = "INIT_LOCKS",

  GET_ALL_LOCKS_START = "GET_ALL_LOCKS_START",
  GET_ALL_LOCKS_SUCCESS = "GET_ALL_LOCKS_SUCCESS",
  GET_ALL_LOCKS_FAIL = "GET_ALL_LOCKS_FAIL",

  GET_UNASSIGNED_LOCKS_START = "GET_UNASSIGNED_LOCKS_START",
  GET_UNASSIGNED_LOCKS_SUCCESS = "GET_UNASSIGNED_LOCKS_SUCCESS",
  GET_UNASSIGNED_LOCKS_FAIL = "GET_UNASSIGNED_LOCKS_FAIL",

  ASSIGN_LOCK_START = "ASSIGN_LOCK_START",
  ASSIGN_LOCK_SUCCESS = "ASSIGN_LOCK_SUCCESS",
  ASSIGN_LOCK_FAIL = "ASSIGN_LOCK_FAIL",

  UNASSIGN_LOCK_START = "UNASSIGN_LOCK_START",
  UNASSIGN_LOCK_SUCCESS = "UNASSIGN_LOCK_SUCCESS",
  UNASSIGN_LOCK_FAIL = "UNASSIGN_LOCK_FAIL",

  OPEN_LOCK_START = "OPEN_LOCK_START",
  OPEN_LOCK_SUCCESS = "OPEN_LOCK_SUCCESS",
  OPEN_LOCK_FAIL = "OPEN_LOCK_FAIL",

  UPDATE_LOCK = "UPDATE_LOCK",

  SELECT_LOCK = "SELECT_LOCK",
  CLEAR_SELECTED_LOCK = "CLEAR_SELECTED_LOCK",

  RESET_LOCK_START = "RESET_LOCK_START",
  RESET_LOCK_SUCCESS = "RESET_LOCK_SUCCESS",
  RESET_LOCK_FAIL = "RESET_LOCK_FAIL",

  DELETE_LOCK_START = "DELETE_LOCK_START",
  DELETE_LOCK_SUCCESS = "DELETE_LOCK_SUCCESS",
  DELETE_LOCK_FAIL = "DELETE_LOCK_FAIL",

  THROW_ERROR = "THROW_ERROR",
  CLEAR_ERROR = "CLEAR_ERROR",
}

export default lockTypes;
