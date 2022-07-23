import jwtDecode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  account_type: null,
  status: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_OUT":
      localStorage.removeItem("token");
      return {
        token: null,
        name: null,
        email: null,
        account_type: null,
        status: null,
      };

    case "SIGN_IN":
    case "SIGN_UP":
    case "USER_LOADED":
      const user = jwtDecode(action.token);
      return {
        ...initialState,
        token: action.token,
        name: user.name,
        email: user.email,
        account_type: user.account_type,
        status: user.status,
        message: action.message,
      };

    default:
      return state;
  }
};

export default authReducer;
