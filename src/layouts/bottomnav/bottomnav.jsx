import { useSelector } from "react-redux";
import { Tooltip } from "flowbite-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  RiHomeSmile2Fill,
  RiStore2Fill,
  RiUserFill,
  RiShoppingCartFill,
} from "react-icons/ri";

const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;
  const product = useSelector((state) => state.product);
  return (
    <>
      <div className="fixed bottom-0 flex bg-white justify-center py-1.5 gap-8  mx-auto w-full max-w-md border rounded-t-2xl border-gray-100">
        <Tooltip content="Homepage">
          <NavLink
            to="/"
            className={`${
              path === "/" ? "bg-gray-100" : null
            }  text-gray-500 flex flex-col items-center p-1 px-2 rounded-md hover:text-gray-500 hover:bg-gray-100 `}
          >
            <RiHomeSmile2Fill size={24} />
            <span className="text-[13px] font-semibold">home</span>
          </NavLink>
        </Tooltip>

        <Tooltip content="Food menu">
          <NavLink
            to="/foods"
            className={`${
              path === "/foods" ? "bg-gray-100" : null
            }  text-gray-500 flex flex-col items-center p-1 px-2 rounded-md hover:text-gray-500 hover:bg-gray-100 `}
          >
            <RiStore2Fill size={24} />
            <span className="text-[13px] font-semibold">foods</span>
          </NavLink>
        </Tooltip>

        <Tooltip content="Your cart">
          <NavLink
            to="/cart"
            className={`${
              path === "/cart" ? "bg-gray-100" : null
            }  text-gray-500 flex flex-col items-center p-1 px-2 rounded-md hover:text-gray-500 hover:bg-gray-100 `}
          >
            <RiShoppingCartFill size={24} />
            {product.cartData.length > 0 ? (
              <span className="bg-red-500 text-red-100 text-[11px] font-medium ml-6 rounded-full absolute top-0  flex items-center justify-center w-4 h-4">
                {product.cartData.length}
              </span>
            ) : null}

            <span className="text-[13px] font-semibold">cart</span>
          </NavLink>
        </Tooltip>

        <Tooltip content="Profile">
          <NavLink
            to="/profile/overview"
            className={`${
              path === "/profile/overview" ||
              path === "/profile/stores" ||
              path === "/profile/wishlists" ||
              path === "/profile/history"
                ? "bg-gray-100"
                : null
            }  text-gray-500 flex flex-col items-center p-1 px-2 rounded-md hover:text-gray-500 hover:bg-gray-100 `}
          >
            <RiUserFill size={24} />
            <span className="text-[13px] font-semibold">profile</span>
          </NavLink>
        </Tooltip>
      </div>
    </>
  );
};

export default BottomNav;
