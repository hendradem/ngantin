import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  RiHomeSmile2Fill,
  RiStore2Fill,
  RiUserFill,
  RiShoppingCartFill,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const product = useSelector((state) => state.product);
  return (
    <>
      <div class="fixed bottom-0 w-full py-2 bg-white border-t-2 border-t-gray-100 flex justify-center items-center">
        <div class="flex space-between gap-12">
          <NavLink
            to="/"
            className="text-gray-500 flex flex-col items-center hover:text-gray-500"
          >
            <RiHomeSmile2Fill size={20} />
            <span className="text-[12px]">home</span>
          </NavLink>

          <NavLink
            to="/foods"
            className="text-gray-500 flex flex-col items-center hover:text-gray-500"
          >
            <RiStore2Fill size={20} />
            <span className="text-[12px]">foods</span>
          </NavLink>

          <NavLink
            to="/cart"
            className="text-gray-500 relative shrink-0 flex flex-col items-center hover:text-gray-500"
          >
            <RiShoppingCartFill size={20} />
            {product.cartData.length > 0 ? (
              <span class="bg-red-500 text-red-100 text-[11px] font-medium ml-6 rounded-full absolute top-0  flex items-center justify-center w-4 h-4">
                {product.cartData.length}
              </span>
            ) : null}

            <span className="text-[12px]">cart</span>
          </NavLink>

          <NavLink
            to="/profile/overview"
            className="text-gray-500 flex flex-col items-center hover:text-gray-500"
          >
            <RiUserFill size={20} />
            <span className="text-[12px]">profile</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
