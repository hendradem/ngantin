import React from "react";
import { HiBell } from "react-icons/hi";
import {
  RiShoppingCart2Fill,
  RiShoppingBasketFill,
  RiPieChart2Fill,
  RiArrowGoBackFill,
} from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div>
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" class="flex ml-2 md:mr-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  class="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Flowbite
                </span>
              </a>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ml-3">
                <button
                  type="button"
                  className="px-2 py-2 mr-2 text-sm font-medium text-center inline-flex items-center text-gray-700 bg-gray-50 rounded-full hover:bg-gray-100 focus:ring-0 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <HiBell size={21} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-100 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-3 font-medium">
            <li>
              <NavLink
                to={"/profile/admin"}
                className={`${
                  path === "/profile/admin" ? "bg-gray-100" : null
                }  flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group `}
              >
                <RiPieChart2Fill
                  size={22}
                  className="text-gray-500 group-hover:text-gray-900"
                />
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/profile/admin/products"}
                className={`${
                  path === "/profile/admin/products" ? "bg-gray-100" : null
                }  flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group `}
              >
                <RiShoppingCart2Fill
                  size={22}
                  className="text-gray-500 group-hover:text-gray-900"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/profile/admin/transactions"}
                className={`${
                  path === "/profile/admin/transactions" ? "bg-gray-100" : null
                }  flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group `}
              >
                <RiShoppingBasketFill
                  size={22}
                  className="text-gray-500 group-hover:text-gray-900"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Transactions
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/profile/stores"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <RiArrowGoBackFill
                  size={22}
                  className="text-gray-500 group-hover:text-gray-900"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Back to app
                </span>
              </NavLink>
            </li>
          </ul>
          <div
            id="dropdown-cta"
            class="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
            role="alert"
          >
            <div class="flex items-center mb-3">
              <span class="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
                Beta
              </span>
              <button
                type="button"
                class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                data-dismiss-target="#dropdown-cta"
                aria-label="Close"
              >
                <span class="sr-only">Close</span>
                <svg
                  class="w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <p class="mb-3 text-sm text-blue-800 dark:text-blue-400">
              Preview the new Flowbite dashboard navigation! You can turn the
              new navigation off for a limited time in your profile.
            </p>
            <a
              class="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
              href="#"
            >
              Turn new navigation off
            </a>
          </div>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-2 mt-14">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
