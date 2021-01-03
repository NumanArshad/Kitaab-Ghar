import {
  GET_ALL_BOOKS,
  GET_SINGLE_BOOK,
  CLEAR_WISH_LIST_BOOKS,
  CLEAR_SINGLE_BOOK,
  CLEAR_ALL_BOOKS,
  WISH_LIST_BOOKS,
} from "../actionTypes";

const initialState = {
  all_books: null,
  single_book: null,
  wish_lists_books: null,
  lastVisible: null,
  count: 0,
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case GET_ALL_BOOKS:
      return {
        all_books: actions.concat
          ? [...state.all_books, ...actions.payload]
          : actions.payload,
        count: actions.count,
        lastVisible: actions.lastVisible,
      };
    case GET_SINGLE_BOOK:
      return { ...state, single_book: actions.payload };
    case CLEAR_ALL_BOOKS:
      return { ...state, all_books: null };

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
