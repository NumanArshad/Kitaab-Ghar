import * as firebase from "firebase";
import firestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfTiGAxWLppRNXDClyrLy3Xac48j7jYwg",
  authDomain: "kitaabghah.firebaseapp.com",
  databaseURL: "https://kitaabghah.firebaseio.com",
  projectId: "kitaabghah",
  storageBucket: "kitaabghah.appspot.com",
  messagingSenderId: "730442494465",
  appId: "1:730442494465:web:d7b28268a505c50a088600",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
