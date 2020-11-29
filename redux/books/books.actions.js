import { GET_ALL_BOOKS, GET_SINGLE_BOOK, CLEAR_BOOKS } from "../actionTypes";
import firebase from "../../utils/firebaseConfig/config";
import { hideLoading, isLoading } from "../loading/loading.actions";
import { error, success } from "../../utils/ToastNotification";

const booksCollectionRef = firebase.firestore().collection("books");

export const getAllBooks = () => (dispatch) => {
  dispatch(isLoading());
  booksCollectionRef.onSnapshot((res) => {
    let books = [];
    res.forEach((payload) => {
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

export const createBookCollection = (data, navigation) => (dispatch) => {
  booksCollectionRef.add(data).then((res) => {
    success("Book Added", "Book added successfully!");
    dispatch(hideLoading());
    navigation.navigate('home')
  });
};
