import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../redux/rootReducer";

const middleware = [thunk];
const custoMiddleWare = (store) => (next) => (action) => {
  console.log(action.type, action.payload);
  next(action);
};

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
