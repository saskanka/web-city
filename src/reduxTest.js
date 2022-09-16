const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducer = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_iceCreaM = "BUY_iceCreaM";

const buyCake = () => {
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
};
const buyiceCream = () => {
  return {
    type: BUY_iceCreaM,
    info: "second redux action",
  };
};

// const initialState = {
//   numberOfCakes: 10,
//   numberOficeCreams: 20,
// };
const cakeInitialState = {
  numberOfCakes: 10,
};
const iceCreamInitialState = {
  numberOficeCreams: 20,
};

const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case BUY_CAKE: {
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    }
    default:
      return state;
  }
};
const iceCreamReducer = (state = iceCreamInitialState, action) => {
  switch (action.type) {
    case BUY_iceCreaM: {
      return {
        ...state,
        numberOficeCreams: state.numberOficeCreams - 1,
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducer({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyiceCream());
console.log("initial state", store.getState());
unsubscribe();
