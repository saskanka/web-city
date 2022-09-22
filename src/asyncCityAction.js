const redux = require("redux");
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const combineReducer = redux.combineReducers;
const createStore = redux.createStore;

const FETCH_CITY_REQUEST = "FETCH_CITY_REQUEST";
const FETCH_CITY_SUCCESS = "FETCH_CITY_SUCCESS";
const FETCH_CITY_FAILURE = "FETCH_CITY_FAILURE";
const UPDATE_FORM_DATA = "UPDATE_FORM_DATA";

export const updateFormData = (cityField) => {
  return {
    type: UPDATE_FORM_DATA,
    payload: cityField,
  };
};
const fetchCityRequest = () => {
  return {
    type: FETCH_CITY_REQUEST,
  };
};
const fetchCitySuccess = (cities) => {
  return {
    type: FETCH_CITY_SUCCESS,
    payload: cities,
  };
};
const fetchCityFailure = (error) => {
  return {
    type: FETCH_CITY_FAILURE,
    payload: error,
  };
};

export const fetchCity = () => {
  console.log("*** fetchCity");
  return function (dispatch) {
    dispatch(fetchCityRequest());
    axios
      .get("http://localhost:8080/city")
      .then((response) => {
        dispatch(fetchCitySuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchCityFailure(error.message));
      });
  };
};

export const addCity = (payload) => {
  console.log("*** payload", payload);
  return function (dispatch) {
    dispatch(fetchCityRequest());
    axios
      .post("http://localhost:8080/city", payload)
      .then((response) => {
        dispatch(fetchCity());
      })
      .catch((error) => {
        dispatch(fetchCityFailure(error.message));
      });
  };
};

const initialState = {
  loading: false,
  cities: [],
  error: "",
  Name: "",
  CountryCode: "",
  District: "",
  Population: undefined,
};

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM_DATA: {
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.targetField]: action.payload.data,
        },
      };
    }
    case FETCH_CITY_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_CITY_SUCCESS: {
      return {
        ...state,
        loading: false,
        cities: action.payload,
        error: "",
      };
    }
    case FETCH_CITY_FAILURE: {
      return {
        ...state,
        loading: false,
        cities: [],
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

// node src/asyncActions.js

const rootReducer = combineReducer({
  cityStore: cityReducer,
});

const rootStore = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);
console.log("initial state", rootStore.getState());
const unsubscribe = rootStore.subscribe(() => {
  console.log("Update state", rootStore.getState());
});
// store.dispatch(fetchCITYs());
// unsubscribe();

export default rootStore;
