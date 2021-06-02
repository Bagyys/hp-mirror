enum propertyTypes {
  GET_ALL_PROPERTIES_START = "GET_ALL_PROPERTIES_START",
  GET_ALL_PROPERTIES_SUCCESS = "GET_ALL_PROPERTIES_SUCCESS",
  GET_ALL_PROPERTIES_FAIL = "GET_ALL_PROPERTIES_FAIL",

  GET_PROPERTIES_WO_LOCKS_START = "GET_PROPERTIES_WO_LOCKS_START",
  GET_PROPERTIES_WO_LOCKS_SUCCESS = "GET_PROPERTIES_WO_LOCKS_SUCCESS",
  GET_PROPERTIES_WO_LOCKS_FAIL = "GET_PROPERTIES_WO_LOCKS_FAIL",

  GET_PROPERTY_START = "GET_PROPERTY_START",
  GET_PROPERTY_SUCCESS = "GET_PROPERTY_SUCCESS",
  GET_PROPERTY_FAIL = "GET_PROPERTY_FAIL",

  THROW_ERROR = "THROW_ERROR",
  CLEAR_ERROR = "CLEAR_ERROR",
}

export default propertyTypes;
