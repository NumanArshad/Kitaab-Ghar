import { SHOW_LOADING, HIDE_LOADING } from "../actionTypes";

const initialState = {
  is_loading: false,
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case SHOW_LOADING:
      return { is_loading: true };
    case HIDE_LOADING:
      return { is_loading: false };
    default:
      return state;
  }
}