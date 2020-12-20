import { bindActionCreators } from "redux";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  GET_CART_LIST,
  CLEAR_CART_LIST,
  GET_ALL_ORDERS,
} from "../actionTypes";

const initialState = {
  all_cart_items_list: [],
  all_orders: null,
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case GET_CART_LIST:
      return { all_orders: actions.payload };
    case ADD_TO_CART:
      return {
        ...state,
        all_cart_items_list: [...state.all_cart_items_list, actions.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        all_cart_items_list: state.all_cart_items_list.filter(
          ({ id }) => id !== actions.bookId
        ),
      };
    case CLEAR_CART_LIST:
      return { ...state, all_cart_items_list: null };
    case GET_ALL_ORDERS:
      return { ...state, all_orders: actions.payload };
    default:
      return state;
  }
}
