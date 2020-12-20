import {
  GET_ALL_BOOKS,
  GET_SINGLE_BOOK,
  CLEAR_WISH_LIST_BOOKS,
  CLEAR_SINGLE_BOOK,
  WISH_LIST_BOOKS,
} from "../actionTypes";

const initialState = {
  all_books: null,
  single_book: null,
  wish_lists_books: null,
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case GET_ALL_BOOKS:
      return { all_books: actions.payload };
    case GET_SINGLE_BOOK:
      return { ...state, single_book: actions.payload };
    case WISH_LIST_BOOKS:
      return { ...state, wish_lists_books: actions.payload };

    case CLEAR_WISH_LIST_BOOKS:
      return { ...state, wish_lists_books: null };
    case CLEAR_SINGLE_BOOK:
      return { ...state, single_book: null };
    default:
      return state;
  }
}
