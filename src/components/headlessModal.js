import React from "react";
const HeadlessModal = ({ title, children, setIsOpen }) => {
  return (
    <div class="h-[100%] w-full flex justify-center align-middle content-center bg-gray-900 bg-opacity-70  z-10 fixed top-0">
      <div
        id="crypto-modal"
        tabindex="-1"
        aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden z-100 w-full md:inset-0 h-modal md:h-full m-5 mt-[50%]"
      >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto z-100">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
             
            <div class="pt-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeadlessModal;
