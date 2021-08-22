enum userTypes {
  LOAD_USER_REQUEST = "LOAD_USER_REQUEST",
  LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS",
  LOAD_USER_FAIL = "LOAD_USER_FAIL",

  LOG_IN_REQUEST = "LOG_IN_REQUEST",
  LOG_IN_SUCCESS = "LOG_IN_SUCCESS",
  LOG_IN_FAILURE = "LOG_IN_FAILURE",

  REGISTER_REQUEST = "REGISTER_REQUEST",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAILURE = "REGISTER_FAILURE",

  LOG_OUT_REQUEST = "LOG_OUT_REQUEST",
  LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS",
  LOG_OUT_FAILURE = "LOG_OUT_FAILURE",

  SEND_VERIFICATION_REQUEST = "SEND_VERIFICATION_REQUEST",
  SEND_VERIFICATION_SUCCESS = "SEND_VERIFICATION_SUCCESS",
  SEND_VERIFICATION_FAIL = "SEND_VERIFICATION_FAIL",

  VERIFY_REQUEST = "VERIFY_REQUEST",
  VERIFY_SUCCESS = "VERIFY_SUCCESS",
  VERIFY_FAIL = "VERIFY_FAIL",

  CLEAR_ERROR = "CLEAR_ERROR",

  ADD_TO_FAVORITE="ADD_TO_FAVORITE" // favorites
}

export default userTypes;
