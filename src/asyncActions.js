const redux = require("redux");
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const createStore = redux.createStore;

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};
const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};
const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("http://localhost:8080/city")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        console.log("*** ", error.message);
        dispatch(fetchUserFailure(error.message));
      });
  };
};

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    }
    case FETCH_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

// to run this file - node src/asyncActions.js

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));
console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("Update state", store.getState());
});
store.dispatch(fetchUsers());
unsubscribe();
