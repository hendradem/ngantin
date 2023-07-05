import React, { useState } from "react";
import { RiSearchLine, RiArrowLeftLine } from "react-icons/ri";
import { IoFastFood, IoCafe } from "react-icons/io5";

export default function SearchBox() {
  const [isClicked, setIsClicked] = useState(false);

  const searchBoxOnClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <div class="relative mb-2 mt-2">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {isClicked ? <RiArrowLeftLine /> : <RiSearchLine />}
        </div>
        <input
          type="text"
          class="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg focus:ring-gray-200 focus:border-gray-200 block w-full pl-10 p-2.5 "
          placeholder="Search foods"
          onClick={searchBoxOnClick}
        />
      </div>
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          className="text-gray-600 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-0 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          <IoFastFood className="mr-1" />
          Foods
        </button>
        <button
          type="button"
          className="text-gray-600 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-0 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          <IoCafe className="mr-1" />
          Drinks
        </button>
      </div>
    </div>
  );
}
