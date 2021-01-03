import {
  ADD_TO_CART,
  GET_CART_LIST,
  REMOVE_FROM_CART,
  UPDATE_CART_LIST,
  CLEAR_CART_LIST,
  GET_ALL_ORDERS,
} from "../actionTypes";
import firebase from "../../utils/firebaseConfig/config";
import { hideLoading, isLoading } from "../loading/loading.actions";
import { error, success } from "../../utils/ToastNotification";
import { getCurrentUser } from "../auth/auth.actions";
import handleAndroidToast from "../../utils/toastAndroid";
import { updateStockOnPOPlace } from "../books/books.actions";

const order = firebase.firestore().collection("orders");

export const getCartList = () => (dispatch) => {
  dispatch({
    type: GET_CART_LIST,
  });
};

export const addToCart = (selectedBook) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: selectedBook,
  });
};

export const removeFromCart = (bookId) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    bookId,
  });
};

export const updateCartList = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_CART_LIST,
    payload: data,
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART_LIST,
  });
};

export const placeOrder = (data) => (dispatch) => {
  dispatch(isLoading());
  order
    .add(data)
    .then((res) => dispatch(updateStockOnPOPlace(data?.orderedBooks)));
};

export const getAllOrders = () => (dispatch) => {
  dispatch(isLoading());

  order
    .where("orderBy", "==", getCurrentUser()?.userId)
    .orderBy("orderDate","desc")
    .get()
    .then((res) => {
      let orders = [];
      res.forEach((trans) => {
        orders.push({ id: trans.id, ...trans.data() });
      });
      dispatch({
        type: GET_ALL_ORDERS,
        payload: orders,
      });
      dispatch(hideLoading());
    }).catch(err =>
      console.error("fetch error is ", err?.message));
};
