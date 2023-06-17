import axios from "axios";
import { url } from "../../api";

export const signUp = (user) => {
  return (dispatch) => {
    axios
      .post(`${url}/register`, user)
      .then((res) => {
        localStorage.setItem("token", res.data.token);

        dispatch({
          type: "SIGN_UP",
          token: res.data.token,
          message: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const signIn = (email, password) => {
  return (dispatch) => {
    axios
      .post(
        `${url}/login`,
        {
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, PUT",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        },
        { email, password }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);

        dispatch({
          type: "SIGN_IN",
          token: res.data.token,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const signOut = () => {
  return (dispatch) => {
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
    } else {
      return false;
    }
  };
};
