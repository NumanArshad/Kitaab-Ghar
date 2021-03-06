import { SHOW_LOADING, HIDE_LOADING } from "../actionTypes";

export const isLoading = () => (dispatch) => {
  dispatch({
    type: SHOW_LOADING,
  });
};

export const hideLoading = () => (dispatch) => {
  dispatch({
    type: HIDE_LOADING,
  });
};