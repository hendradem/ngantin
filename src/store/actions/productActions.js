import axios from "axios";
import { url } from "../../api";

export const addToCart = (selectedItem) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_TO_CART",
      selectedItem,
    });
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_TODOS",
    });

    dispatch({
      type: "SIGN_OUT",
    });
  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token) {
      dispatch({
        type: "USER_LOADED",
        token,
      });
    } else return null;
  };
};
