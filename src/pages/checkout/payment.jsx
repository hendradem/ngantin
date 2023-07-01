import React from "react";
import ClossableNavbar from "../../layouts/navbar/clossable_navbar";
import { HiCash } from "react-icons/hi";

function Payment() {
  return (
    <div>
      <ClossableNavbar title={"Select payment"} from={"cart"} />
      <div class="p-3">
        <div class="p-4 max-w-sm bg-white rounded-lg border border-gray-100 sm:p-6 ">
          <h5 class="mb-3 text-base font-semibold text-gray-600 lg:text-xl dark:text-white">
            Choose payment method
          </h5>
          <ul class="my-4 space-y-3 ">
            <li>
              <a
                href="#"
                class="flex items-center p-3 border border-gray-100 font-semibold text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                <HiCash size={22} />
                <span class="flex-1 ml-3 whitespace-nowrap">Cash / QRIS</span>
                <span class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                  Popular
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                class="flex items-center p-3 border border-gray-100 font-semibold text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                <HiCash size={22} />
                <span class="flex-1 ml-3 whitespace-nowrap">Gopay</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-3 border border-gray-100 font-semibold text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                <HiCash size={22} />
                <span class="flex-1 ml-3 whitespace-nowrap">Shopee Pay</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-3 border border-gray-100 font-semibold text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                <HiCash size={22} />
                <span class="flex-1 ml-3 whitespace-nowrap">OVO</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="w-full fixed flex bottom-0 border-t border-t-gray-100 px-4 py-2">
        <div class="flex-1 w-32">
          <span class="font-reguler text-sm text-gray-400 m-0">
            Total price:
          </span>
          <h6 class="font-bold text-gray-600 text-md m-0 -mt-1">Rp 18.000</h6>
        </div>

        <button
          class="flex-1 w-64 text-white bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2focus:outline-none"
          type="button"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

const style = {
  imageContainer: {
    width: "70px",
    height: "70px",
  },
  imageThumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default Payment;
