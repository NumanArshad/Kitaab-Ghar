import { ActivityIndicator } from "react-native-paper";
import {
  IS_AUTHENTICATED,
  GET_AUTH_USER_INFO,
  IS_SIGN_OUT,
} from "../actionTypes";

const initialState = {
  //auth_user: null,
  auth_role: null,
  is_auth: false,
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case IS_AUTHENTICATED:
      return {
        is_auth: true,
        auth_role: actions.authRole,
      };
    // case GET_AUTH_USER_INFO:
    //   return {
    //     ...state,
    //     auth_user: actions.payload,
    //   };
    case IS_SIGN_OUT:
      console.log("should signout");
      return { is_auth: false, auth_role: null };
    default:
      return state;
  }
}
