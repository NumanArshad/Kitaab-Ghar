import {
  GET_ALL_BOOKS,
  GET_SINGLE_BOOK,
  CLEAR_WISH_LIST_BOOKS,
  CLEAR_SINGLE_BOOK,
  WISH_LIST_BOOKS,
} from "../actionTypes";
import firebase from "../../utils/firebaseConfig/config";
import { hideLoading, isLoading } from "../loading/loading.actions";
import { error, success } from "../../utils/ToastNotification";
import { getCurrentUser } from "../auth/auth.actions";

const booksCollectionRef = firebase.firestore().collection("books");

export const getAllBooks = () => (dispatch) => {
  dispatch(isLoading());
  booksCollectionRef.onSnapshot((res) => {
    let books = [];
    res.forEach((payload) => {
      ////console.log("hey",payload.data()?.wishUsers )
      books.push({ id: payload.id, ...payload.data() });
    });
    //  alert(JSON.stringify(books));
    dispatch({
      type: GET_ALL_BOOKS,
      payload: books,
    });
    dispatch(hideLoading());
  });
};


////////////////////wishlist books////////////
export const getAllWishListBooks = () => (dispatch) => {
  dispatch(isLoading());
  booksCollectionRef
    .where("wishListUsers", "array-contains", getCurrentUser()?.userId)
    .get()
    .then((res) => {
      let wishList = [];
      res.forEach((snapshot) =>
        wishList.push({ id: snapshot.id, ...snapshot.data() })
      );
      //console.log("jfdjfbe", wishList)
      
      dispatch({
        type: WISH_LIST_BOOKS,
        payload: wishList,
      });
      dispatch(hideLoading());
    });
};

export const clearWishLists = (_) => (dispatch) => {
  dispatch({
    type: CLEAR_WISH_LIST_BOOKS,
  });
};


////////////////////wishlist books////////////

export const getSingleBook = (id) => (dispatch) => {
  ////console.log("getting target",id)
  dispatch(isLoading());
  booksCollectionRef
    .doc(id)
    .get()
    .then((res) => {
      if (res.exists) {
        //    //console.log("data is", res.data())
        dispatch({
          type: GET_SINGLE_BOOK,
          payload: res.data(),
        });
        dispatch(hideLoading());
      }
    });
};

export const createBookCollection = (data, navigation) => (dispatch) => {
  booksCollectionRef.add(data).then((res) => {
    //  success("Book Added", "Book added successfully!");

    alert("added successfully!");
    dispatch(hideLoading());
    navigation.navigate("home");
  });
};

export const updateBook = (data) => (dispatch) => {
  const { id, ...rest } = data;

  booksCollectionRef
    .doc(id)
    .update(rest)
    .then((res) => {
      dispatch(hideLoading());
      //dispatch(clearSingleBook());
    })
    
    };



export const clearSingleBook = (_) => (dispatch) => {
  dispatch({
    type: CLEAR_SINGLE_BOOK,
  });
};
