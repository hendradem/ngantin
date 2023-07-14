import { useState, useRef } from "react";
import axios from "axios";
import { BottomSheet } from "react-spring-bottom-sheet";
import { url } from "../../api";
import { RiArrowLeftSLine, RiCloseFill } from "react-icons/ri";
import { HiOutlinePlus, HiTrash } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const CheckoutBottomSheet = ({ isOpen, onClose, onOpen }) => {
  const auth = useSelector((state) => state.auth);
  const [sheetState, setSheetState] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sheetHeight, setSheetHeight] = useState(0.9);
  const storeNameRef = useRef(null);

  const onAddStore = () => {
    setIsLoading(true);
    if (storeNameRef.current.value == "") {
      toast.error("Input your store name", {
        duration: 1200,
      });
      setIsLoading(false);
      return;
    }

    axios
      .post(`${url}/store`, {
        store_name: storeNameRef.current.value,
        user_email: auth.email,
      })
      .then(function (res) {
        if (res.data.message == "success") toast.success("Store created");
        setIsLoading(false);
        setTimeout(() => {
          onClose();
        }, 500);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  if (!isOpen) return null;

  return (
    <>
      <BottomSheet
        open={isOpen}
        blocking="true"
        onDismiss={onClose}
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 5,
          maxHeight * sheetHeight,
        ]}
        header={
          <div className="flex justify-between items-center">
            {sheetState !== 1 ? (
              <button
                onClick={() => {
                  setSheetState(1);
                  setSheetHeight(1);
                }}
                className="rounded-full p-2 bg-gray-100"
              >
                <RiArrowLeftSLine className="text-lg text-gray-700" />
              </button>
            ) : (
              <button className="rounded-full"></button>
            )}

            <h2 className="text-center font-medium text-lg text-gray-700">
              Checkout
            </h2>
            <button onClick={onClose} className="rounded-full p-2 bg-gray-100">
              <RiCloseFill className="text-lg text-gray-700" />
            </button>
          </div>
        }
      >
        <div className="mx-3">
          <div class="mt-4">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your orders
            </label>
            <div>
              <div className="">
                <div className="flex border border-gray-100 shadow-sm w-full rounded-lg p-2 mt-1">
                  <div style={style.imageContainer} className="flex-none">
                    <img
                      className="rounded-md"
                      src=""
                      style={style.imageThumbnail}
                    />
                  </div>
                  <div className="ml-3 flex-1 w-64 pt-1">
                    <h6 className="text-gray-600 text-md font-semibold">
                      asdasd
                    </h6>
                    <h6 className="text-orange-400 text-sm font-medium">
                      Rp 123
                    </h6>
                    <p className="text-xs font-reguler text-gray-400">
                      Total: 2
                    </p>
                  </div>
                  <div className="ml-2 flex w-32 flex-grow-0 items-center justify-end pt-1">
                    <div className="flex items-center border px-1 border-gray-100 shadow-xs rounded-full">
                      <button
                        type="button"
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center leading-10 text-gray-600 transition hover:opacity-75"
                      >
                        <HiTrash size={19} />
                      </button>

                      <input
                        type="number"
                        className="h-10 w-12 border-transparent text-center focus:border-none focus:ring-0 [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      />

                      <button
                        type="button"
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center leading-10 text-gray-600 transition hover:opacity-75"
                      >
                        <HiOutlinePlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onAddStore}
            disabled={isLoading}
            class="text-white w-full mt-3 bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
            type="button"
          >
            {isLoading && (
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {isLoading ? "Loading..." : "Open my store"}
          </button>
        </div>
      </BottomSheet>
    </>
  );
};

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

export default CheckoutBottomSheet;
