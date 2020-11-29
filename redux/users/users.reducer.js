import { IS_AUTHENTICATED, IS_SIGN_OUT } from "../actionTypes";

const initialState = {
  auth_user: null,
  auth_role: null,
  is_auth: false,
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case IS_AUTHENTICATED:
      return {
        auth_user: action.payload,
        is_auth: true,
        auth_role: action.authRole,
      };
    case IS_SIGN_OUT:
      return { auth_user: null, is_auth: false, auth_role: null };
    default:
      return state;
  }
}
