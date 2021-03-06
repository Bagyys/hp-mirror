enum reservationTypes {
  GET_ACTIVE_RESERVATIONS_START = "GET_ACTIVE_RESERVATIONS_START",
  GET_ACTIVE_RESERVATIONS_SUCCESS = "GET_ACTIVE_RESERVATIONS_SUCCESS",
  GET_ACTIVE_RESERVATIONS_FAIL = "GET_ACTIVE_RESERVATIONS_FAIL",

  SELECT_RESERVATION_START = "SELECT_RESERVATION_START",
  SELECT_RESERVATION_SUCCESS = "SELECT_RESERVATION_SUCCESS",
  SELECT_RESERVATION_FAIL = "SELECT_RESERVATION_FAIL",

  UNSELECT_RESERVATION = "UNSELECT_RESERVATION",

  CANCEL_USER_RESERVATION_START = "CANCEL_USER_RESERVATION_START",
  CANCEL_USER_RESERVATION_SUCCESS = "CANCEL_USER_RESERVATION_SUCCESS",
  CANCEL_USER_RESERVATION_FAIL = "CANCEL_USER_RESERVATION_FAIL",

  OPEN_CURRENT_LOCK_START = "OPEN_CURRENT_LOCK_START",
  OPEN_CURRENT_LOCK_SUCCESS = "OPEN_CURRENT_LOCK_SUCCESS",
  OPEN_CURRENT_LOCK_FAIL = "OPEN_CURRENT_LOCK_FAIL",

  UPDATE_CURRENT_LOCK = "UPDATE_CURRENT_LOCK",

  GET_PAST_RESERVATIONS_START = "GET_PAST_RESERVATIONS_START",
  GET_PAST_RESERVATIONS_SUCCESS = "GET_PAST_RESERVATIONS_SUCCESS",
  GET_PAST_RESERVATIONS_FAIL = "GET_PAST_RESERVATIONS_FAIL",

  CLEAR_ERROR = "CLEAR_ERROR",
}

export default reservationTypes;
