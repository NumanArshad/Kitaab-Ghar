import { auth } from "firebase";
import { hideLoading } from "../loading/loading.actions";
import firebase from "../../utils/firebaseConfig/config";
import { ToastRendered, success, error } from "../../utils/ToastNotification";
import { getSignInUserRole } from "../users/users.actions";
import {
  IS_AUTHENTICATED,
  GET_AUTH_USER_INFO,
  IS_SIGN_OUT,
} from "../actionTypes";

const authRef = firebase.auth();

export const authenticatedAction = (role) => (dispatch) => {
  dispatch({
    type: IS_AUTHENTICATED,
    authRole: role,
  });
};

export const getAuthUserInfo = (user) => (dispatch) => {
  dispatch({
    type: GET_AUTH_USER_INFO,
    payload: user,
  });
};

export const signUpUserWithEmailPassword = async (email, password) => {
  try {
    const authSignUp = await authRef.createUserWithEmailAndPassword(
      email,
      password
    );
  } catch (err) {
    error("SignUp error", err);
    return Promise.reject(err);
  }
};

export const signInUser = (email, password) => async (dispatch) => {
  try {
    const authSignIn = await authRef.signInWithEmailAndPassword(
      email,
      password
    );
    const {
      user: { uid },
    } = authSignIn;
    // dispatch({
    //   type: GET_AUTH_USER_INFO,
    //   payload: user,
    // });
    dispatch(getSignInUserRole(uid, "showToast"));
  } catch (err) {
    error("SignIn error", err.message);
    Promise.reject(err);
    dispatch(hideLoading());
  }
};

export const authObserver = () => (dispatch) => {
  authRef.onAuthStateChanged((user) => {
    if (user) {
      dispatch(getSignInUserRole(user.uid));
    } else {
      dispatch({
        type: IS_SIGN_OUT,
      });
    }
  });
};

export const getCurrentUser = () => {
  const { email, phoneNumber, photoURL, uid: userId } = authRef.currentUser || {};
  return { email, phoneNumber, photoURL, userId };
};

//////////////////Google signin///////////////////////////
export const googleSignIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  authRef
    // .signInWithPopup(provider)
    .signInWithRedirect(provider)
    .then((res) =>
      console.log("google sign in response is ", res.credential, res.user)
    )
    .catch((err) => console.error("errr in google sign in is", err.message));
};

//////////////////Google signin///////////////////////////
export const logout = async () => {
  // alert("called")

  authRef
    .signOut()
    .then((res) => {
      //console.log("logout")
      success("logout", "Logout successfully!");
    })
    .catch((err) => {
      error("SignOut error", err);
      return Promise.reject(err);
    });
  // authRef.signOut();
};
