import React, { useState, useRef, Fragment, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { url } from "../../api/index";
import { HiOutlineUpload, HiOutlineX } from "react-icons/hi";
import { useSelector } from "react-redux";
import axios from "axios";
import { storage } from "../../api/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-hot-toast";

function ProductEditModal({ isOpen, onClose, product }) {
  const auth = useSelector((state) => state.auth);
  //   const [product, setProduct] = useState([]);
  const [isDiscount, setIsDiscount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const [IDStore, setIDStore] = useState("");
  const [productImage, setProductImage] = useState(
    "https://sdaisyiyah.sch.id/assets/post/default.png"
  );
  const productTitleInput = useRef(null);
  const productCodeInput = useRef(null);
  const productPriceInput = useRef(null);
  const productStockInput = useRef(null);

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const noImage =
    "https://firebasestorage.googleapis.com/v0/b/canteen-4d03f.appspot.com/o/assets%2Fno-image-post_struktur-organisasi.jpg?alt=media&token=472aae8e-c856-4fe1-9eaf-57ee5cb9a4c8";

  const onUploadImage = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `product_image/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          toast.success("Image uploaded", {
            duration: 700,
            position: "top-center",
          });
        });
      }
    );
  };

  const onUpdateProduct = () => {
    const itemData = {
      title: productTitleInput.current.value,
      product_code: productCodeInput.current.value,
      image: imgUrl ? imgUrl : product[0]?.image,
      price: productPriceInput.current.value,
      stock: productStockInput.current.value,
      category: product[0]?.category,
      id_user: auth.email,
      id_store: product[0]?.id_store,
      discount: 0,
      status: 1,
    };

    setIsLoading(true);

    if (
      !itemData.title ||
      !itemData.product_code ||
      !itemData.price ||
      !itemData.stock
    ) {
      toast.error("Fill all required field", { duration: 1200 });
      setIsLoading(false);
    } else {
      setIsLoading(true);
      axios
        .put(`${url}/editProduct/${product[0]?.code}`, itemData)
        .then((res) => {
          toast.success("Product updated", {
            duration: 1200,
            position: "top-center",
          });
          if (res.data.message) {
            setIsLoading(false);
            setTimeout(() => {
              onClose();
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      as={Fragment}
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-75"
    >
      <div
        data-modal-backdrop="static"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative w-full max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Edit your product
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="staticModal"
                onClick={onClose}
              >
                <HiOutlineX size={21} />
              </button>
            </div>
            <div class="p-6 space-y-6">
              <div class="mb-4">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Product image
                </label>
                <div class="flex border border-gray-100 w-full rounded-md p-2 mt-1">
                  <div style={style.imageContainer} class="flex-none">
                    <img
                      class="rounded-md"
                      src={`${imgUrl ? imgUrl : product[0]?.image}`}
                      style={style.imageThumbnail}
                    />
                  </div>
                  <div class="ml-3 flex-1 w-64">
                    <div class="flex justify-center items-center w-full">
                      <label
                        for="dropzone-file"
                        class="flex flex-col justify-center items-center w-full h-20 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer"
                      >
                        <div class="flex flex-col justify-center items-center pt-5 pb-6">
                          <HiOutlineUpload size={35} class="text-gray-400" />
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">
                              Click to upload product image
                            </span>
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          class="hidden"
                          onChange={(e) => {
                            onUploadImage(e);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-4 mt-4">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Product title
                </label>
                <input
                  type="text"
                  defaultValue={product[0]?.title}
                  ref={productTitleInput}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="example: Rice bowl"
                  required
                />
              </div>

              <div class="mb-4">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Product code
                </label>
                <input
                  type="text"
                  ref={productCodeInput}
                  defaultValue={product[0]?.code}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="example: RB-021"
                  required
                />
              </div>

              <div class="mb-4">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Product price (in IDR)
                </label>
                <input
                  type="text"
                  ref={productPriceInput}
                  defaultValue={product[0]?.price}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="example: 25000"
                  required
                />
              </div>

              <div class="mb-4">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Product stock
                </label>
                <input
                  type="number"
                  ref={productStockInput}
                  defaultValue={product[0]?.stock}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="example: 20"
                  required
                />
              </div>

              {isDiscount && (
                <div class="mb-4">
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Product discount (in %)
                  </label>
                  <input
                    type="number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="example: 5"
                  />
                </div>
              )}

              <button
                onClick={onUpdateProduct}
                class="text-white w-full mt-7 bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
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
                {isLoading ? "Updating..." : "Update product"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

const style = {
  imageContainer: {
    width: "80px",
    height: "80px",
  },
  imageThumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default ProductEditModal;
