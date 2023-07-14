import React from "react";
import ClossableNavbar from "../../layouts/navbar/clossable_navbar";

function food_detail() {
  return (
    <div>
      <ClossableNavbar />
      <div style={style.foodDetailImages}>
        <img
          style={style.foodImage}
          src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGluZG9uZXNpYW4lMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
        />
      </div>
      <div class="p-4">
        <div class="flex justify-between">
          <h5 class="text-[20px] font-semibold tracking-tight text-gray-900 m-0">
            Roti pisang
          </h5>
          <p class="text-[20px] font-semibold text-orange-500 mt-[3px]">
            Rp 7.000
          </p>
        </div>

        <p class="mb-3 mt-3 font-normal text-sm text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
      <div class="w-full fixed bottom-0 border-t border-t-gray-200 px-4 py-2">
        <button
          class="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 mr-2focus:outline-none"
          type="button"
        >
          Buy item
        </button>
      </div>
    </div>
  );
}

const style = {
  foodDetailImages: {
    width: "100%",
    height: "300px",
  },
  foodImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default food_detail;
