import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiUserCircle } from "react-icons/hi";
import { signOut } from "../../store/actions/authActions";
import { NavLink, useLocation } from "react-router-dom";

function ProfileHeader() {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  const [showOverview, setShowOverview] = useState(true);
  const [showProducts, setShowProducts] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(signOut());
  };

  return (
    <div>
      <div class="flex flex-col items-center">
        <HiUserCircle class="text-gray-200 w-[80px] h-[80px]" />
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          {auth.name}
        </h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          Default account
        </span>
        <div class="flex mt-3 space-x-2">
          <button class="inline-flex items-center py-1.5 px-3 text-xs font-medium text-center text-gray-900 bg-white rounded-md border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">
            Edit profile
          </button>
          <button
            onClick={handleLogout}
            class="inline-flex items-center py-1.5 px-3 text-xs font-medium text-center text-gray-900 bg-white rounded-md border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
          >
            Logout
          </button>
        </div>
        <div class="border-b w-full flex justify-center border-gray-200 mt-2">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 ">
            <li>
              <NavLink to="/profile/overview">
                <button
                  class={`${
                    path === "/profile/overview"
                      ? "text-blue-600 rounded-t-lg border-b-2 border-blue-500"
                      : null
                  }  inline-flex p-4 rounded-t-lg `}
                >
                  Overview
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile/product">
                <button
                  class={`${
                    path === "/profile/product"
                      ? "text-blue-600 rounded-t-lg border-b-2 border-blue-500"
                      : null
                  } inline-flex p-4 rounded-t-lg `}
                >
                  Product
                </button>
              </NavLink>
            </li>
            <li>
              <button class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 ">
                Wishlists
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
