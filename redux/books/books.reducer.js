import {
  GET_ALL_BOOKS,
  GET_SINGLE_BOOK,
  CLEAR_BOOKS,
  CLEAR_SINGLE_BOOK,
} from "../actionTypes";

const initialState = {
  all_books: null,
  single_book: null,
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case GET_ALL_BOOKS:
      return { all_books: actions.payload };
    case GET_SINGLE_BOOK:
      return { ...state, single_book: actions.payload };
    case CLEAR_BOOKS:
      return { all_books: null };
    case CLEAR_SINGLE_BOOK:
      return { ...state, single_book: null };
    default:
      return state;
  }
}
