import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

const initialState = {
  cartData: []
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...initialState,
       cartData: action.selectedItem,
      };
    default:
      return state;
  }
};

export default productReducer;
