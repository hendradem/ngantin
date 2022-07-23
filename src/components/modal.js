import React from "react";
const Modal = ({ title, children, setIsOpen }) => {
  return (
    <div class="h-[100%] w-full flex justify-center align-middle content-center bg-gray-900 bg-opacity-70  z-10 fixed top-0">
      <div
        id="crypto-modal"
        tabindex="-1"
        aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden z-100 w-full md:inset-0 h-modal md:h-full m-5 mt-[30%]"
      >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto z-100">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              class="absolute top-2 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="crypto-modal"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div class="py-2.5 px-6 rounded-t border-b dark:border-gray-600">
              <h3 class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                {title}
              </h3>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
