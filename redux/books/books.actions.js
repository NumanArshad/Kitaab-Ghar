import {
  GET_ALL_BOOKS,
  GET_SINGLE_BOOK,
  CLEAR_WISH_LIST_BOOKS,
  CLEAR_SINGLE_BOOK,
  CLEAR_ALL_BOOKS,
  WISH_LIST_BOOKS,
} from "../actionTypes";
import firebase from "../../utils/firebaseConfig/config";
import { hideLoading, isLoading } from "../loading/loading.actions";
import { getCurrentUser } from "../auth/auth.actions";
import { clearCart } from "../orders/orders.actions";
import handleAndroidToast from "../../utils/toastAndroid";
import {
  getDocumentCount,
  updateDocumentCount,
} from "../documentCount/documentCount";

const booksCollectionRef = firebase.firestore().collection("books");

export const getAllBooks = (concat, last) => async (dispatch) => {
  const { count } = await getDocumentCount("books");
  const fetchData = concat
    ? booksCollectionRef.orderBy("bookName").startAfter(last)
    : booksCollectionRef.orderBy("bookName");
  dispatch(isLoading());

  fetchData.limit(5).onSnapshot((res) => {
    let books = [];

    let lastVisible = res.docs[res.docs.length - 1];
    res.forEach((payload) => {
      books.push({ id: payload.id, ...payload.data() });
    });
    console.log("fkenn", books?.length);
    dispatch({
      type: GET_ALL_BOOKS,
      payload: books,
      concat,
      count,
      lastVisible,
    });
    dispatch(hideLoading());
  });
};

///////////////////////// update books stock after place order  /////////////////////
export const updateStockOnPOPlace = (purchaseBooks) => (dispatch) => {
  firebase
    .firestore()
    .runTransaction((transaction) => {
      purchaseBooks.forEach(({ bookId, prQty }) => {
        const docRef = booksCollectionRef.doc(bookId);
        transaction.get(docRef).then((bookDoc) => {
          const { stock, ...restinfo } = bookDoc.data();
          const updateStock = parseInt(stock) - parseInt(prQty);
          docRef.update({ ...restinfo, stock: updateStock });
        });
      });
      return Promise.resolve();
    })
    .then((trResponse) => {
      dispatch(hideLoading());
      dispatch(clearCart());
      handleAndroidToast("Order Places successfully!");
    })
    .catch((err) => Promise.reject(err.message));
};

///////////////////////// update books stock after place order  /////////////////////

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
  dispatch(isLoading());
  booksCollectionRef
    .doc(id)
    .get()
    .then((res) => {
      if (res.exists) {
        dispatch({
          type: GET_SINGLE_BOOK,
          payload: res.data(),
        });
        dispatch(hideLoading());
      }
    });
};

export const removeBook = (id, navigation) => (dispatch) => {
  booksCollectionRef
    .doc(id)
    .delete()
    .then((res) => {
      updateDocumentCount("books", "remove");
      dispatch(clearBooks());
      handleAndroidToast("Book Deleted successfully");
      navigation.navigate("home");
    })
    .catch((err) => {
      console.error("error in removing book");
      return Promise.reject(err?.message);
    });
};

export const createBookCollection = (data, navigation) => async (dispatch) => {
  try {

    await updateDocumentCount("books");
    const adPromise = await booksCollectionRef.add(data);
    console.log("add promise is ", adPromise);
    if (adPromise) {
      dispatch(clearBooks());
      dispatch(hideLoading());
      handleAndroidToast("added successfully!");
      navigation.navigate("home");
    }
  } catch (err) {
    console.log("add book error message is ", err?.message);
    handleAndroidToast(err.message);
    return Promise.reject();
  }
};

export const updateBook = (data) => (dispatch) => {
  const { id, ...rest } = data;

  booksCollectionRef
    .doc(id)
    .update(rest)
    .then((res) => {
      dispatch(hideLoading());
      //dispatch(clearSingleBook());
    });
};

export const clearSingleBook = (_) => (dispatch) => {
  dispatch({
    type: CLEAR_SINGLE_BOOK,
  });
};

export const clearBooks = (_) => (dispatch) => {
  dispatch({
    type: CLEAR_ALL_BOOKS,
  });
};
