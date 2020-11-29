import { GET_ALL_BOOKS, CLEAR_BOOKS} from "../actionTypes";

const initialState = {
  all_books: null,
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case GET_ALL_BOOKS:
      return { all_books: actions.payload };
    case CLEAR_BOOKS:
      return { all_books: null };
    default:
      return state;
  }
}