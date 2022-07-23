import React, { useState, useRef } from "react";
import ClossableNavbar from "../../../layouts/navbar/clossable_navbar";
import HeadlessModal from "../../../components/headlessModal";
import successIllustration from "../../../assets/images/illustration/success.png";

import { url } from "../../../api/index";
import { HiOutlineUpload } from "react-icons/hi";
import { useSelector } from "react-redux";
import axios from "axios";
import { storage } from "../../../api/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { NavLink } from "react-router-dom";

function ProductAdd() {
  const auth = useSelector((state) => state.auth);
  const [isDiscount, setIsDiscount] = useState(false);
  const [successAddProduct, setSuccessAddProduct] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(
    "https://sdaisyiyah.sch.id/assets/post/default.png"
  );
  const productTitleInput = useRef(null);
  const productCodeInput = useRef(null);
  const productPriceInput = useRef(null);
  const productStockInput = useRef(null);
  const productDiscountInput = useRef(0);

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const noImage =
    "https://firebasestorage.googleapis.com/v0/b/canteen-4d03f.appspot.com/o/assets%2Fno-image-post_struktur-organisasi.jpg?alt=media&token=472aae8e-c856-4fe1-9eaf-57ee5cb9a4c8";

  const onChangeDiscountToggle = (e) => {
    console.log(e.target.value);
  };
  const onSelectCategory = (e) => {
    setProductCategory(e.target.value);
  };

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
        });
      }
    );
  };

  const onSellItem = () => {
    const itemData = {
      title: productTitleInput.current.value,
      code: productCodeInput.current.value,
      image: imgUrl,
      price: productPriceInput.current.value,
      stock: productStockInput.current.value,
      category: productCategory,
      id_user: auth.email,
      discount: 0,
      status: 1,
    };

    axios
      .post(`${url}/addProduct`, itemData)
      .then((res) => {
        if (res.data.message) setSuccessAddProduct(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <ClossableNavbar title={"Add item"} from={"profile/product"} />
      <div class="p-4 pt-[70px] pb-7">
        {/* {!imgUrl && (
          <div class="outerbar">
            <div class="innerbar" style={{ width: `${progresspercent}%` }}>
              {progresspercent}%
            </div>
          </div>
        )}
        {imgUrl && <img src={imgUrl} alt="uploaded file" height={100} />} */}

        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Product image
          </label>
          <div class="flex border border-gray-100 w-full rounded-md p-2 mt-1">
            <div style={style.imageContainer} class="flex-none">
              <img
                class="rounded-md"
                src={`${imgUrl ? imgUrl : noImage}`}
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
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="example: 20"
            required
          />
        </div>
        <label
          for="small-toggle"
          class="inline-flex relative items-center mb-5 cursor-pointer"
        >
          <input
            type="checkbox"
            value=""
            id="small-toggle"
            class="sr-only peer"
            onChange={(e) => {
              onChangeDiscountToggle(e);
            }}
          />
          <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Add discount
          </span>
        </label>

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

        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          Product category
        </label>
        <select
          onChange={(e) => {
            onSelectCategory(e);
          }}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose category</option>
          <option value="1">Food</option>
          <option value="2">Drink</option>
        </select>

        <button
          onClick={onSellItem}
          class="text-white w-full mt-7 bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
          type="button"
        >
          Sell my item
        </button>
      </div>

      {successAddProduct && (
        <HeadlessModal setIsOpen={setSuccessAddProduct}>
          <div class="p-6 flex flex-col items-center">
            <img src={successIllustration} class="mb-2 w-[70%]" />
            <p class="text-lg font-medium text-center text-gray-800">
              Success add product
            </p>
            <p class="text-sm font-normal text-gray-600">
              Place your product in the display box
            </p>

            <NavLink to="/profile" class="w-full">
              <button
                class="text-white w-full mt-7 bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
                type="button"
              >
                Back to profile
              </button>
            </NavLink>
          </div>
        </HeadlessModal>
      )}
    </main>
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

export default ProductAdd;
