import { IS_AUTHENTICATED } from "../actionTypes";
import { authenticatedAction } from "../auth/auth.actions";
import { hideLoading } from "../loading/loading.actions";
import firebase from "../../utils/firebaseConfig/config";
import { ToastRendered, success, error } from "../../utils/ToastNotification";

const userCollection = firebase.firestore().collection("users");

export const createLoginUser = (userId, role) => {
  userCollection
    .add({ userId, role })
    .then((res) => success(`${role} SignUp`, "Sign Up successfully!"));
};

export const getSignInUserRole = (userId, showToast) => (dispatch) => {
  userCollection
    .where("userId", "==", userId)
    .get()
    .then((snapShot) => {
      snapShot.forEach((user) => {
        const { role } = user.data();
        if (showToast) {
          if (role === "shopKeeper") {
            success(`Shop keeper SignIn`, "Sign In successfully!");
          } else if (role === "isAdmin") {
            success(`Admin SignIn`, "Sign In successfully!");
          } else {
            success(`Customer SignIn`, "Customer successfully!");
          }
        }
        dispatch(authenticatedAction(role));
        dispatch(hideLoading());
      });
    });
};
