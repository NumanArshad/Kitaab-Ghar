import { combineReducers } from "redux";
import loadingReducer from "./loading/loading.reducer";
import authReducer from "./auth/auth.reducer";
import bookReducer from "./books/books.reducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  books: bookReducer
});

export default rootReducer;
