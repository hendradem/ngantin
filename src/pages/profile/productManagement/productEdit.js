import React, { useEffect, useState, useRef } from "react";
import ClossableNavbar from "../../../layouts/navbar/clossable_navbar";
import HeadlessModal from "../../../components/headlessModal";
import successIllustration from "../../../assets/images/illustration/success.png";

import { url } from "../../../api/index";
import { HiOutlineUpload } from "react-icons/hi";
import { useSelector } from "react-redux";
import { storage } from "../../../api/firebase";
import axios from "axios";

import { NavLink, useParams } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function ProductEdit() {
  const auth = useSelector((state) => state.auth);
  const [product, setProduct] = useState([]);
  const [isDiscount, setIsDiscount] = useState(false);
  const [successEditProduct, setSuccessEditProduct] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(
    "https://sdaisyiyah.sch.id/assets/post/default.png"
  );
  const [isImageEdited, setIsImageEdited] = useState(false);

  const productTitleInput = useRef(null);
  const productCodeInput = useRef(null);
  const productPriceInput = useRef(null);
  const productStockInput = useRef(null);
  const productDiscountInput = useRef(0);

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const noImage =
    "https://firebasestorage.googleapis.com/v0/b/canteen-4d03f.appspot.com/o/assets%2Fno-image-post_struktur-organisasi.jpg?alt=media&token=472aae8e-c856-4fe1-9eaf-57ee5cb9a4c8";

  let { id } = useParams();

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
          setIsImageEdited(true);
        });
      }
    );
  };

  const onUpdateItem = () => {
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
      .put(`${url}/editProduct/${id}`, itemData)
      .then((res) => {
        if (res.data.message) setSuccessEditProduct(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(id);
    axios
      .post(`${url}/getProductForUpdate`, {
        product_code: id,
        id_user: auth.email,
      })
      .then((res) => {
        setProduct(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <main>
      <ClossableNavbar title={"Edit item"} from={"profile/product"} />
      <div class="p-4 pt-[70px] pb-7">
        {product.map((item) => {
          return (
            <div>
              <div class="mb-4">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Product image
                </label>
                <div class="flex border border-gray-100 w-full rounded-md p-2 mt-1">
                  <div style={style.imageContainer} class="flex-none">
                    <img
                      class="rounded-md"
                      src={`${isImageEdited ? imgUrl : item.image}`}
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
                              Click to edit product image
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
                  defaultValue={item.title}
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
                  defaultValue={item.code}
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
                  defaultValue={item.price}
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
                  defaultValue={item.stock}
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
                  defaultValue=""
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
                <option>Choose category</option>
                <option value="1" selected={item.category === 1 ? true : false}>
                  Food
                </option>
                <option value="2" selected={item.category === 2 ? true : false}>
                  Drink
                </option>
              </select>
            </div>
          );
        })}

        <button
          onClick={onUpdateItem}
          class="text-white w-full mt-7 bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
          type="button"
        >
          Update my item
        </button>
      </div>

      {successEditProduct && (
        <HeadlessModal setIsOpen={setSuccessEditProduct}>
          <div class="p-6 flex flex-col items-center">
            <img src={successIllustration} class="mb-2 w-[70%]" />
            <p class="text-lg font-medium text-center text-gray-800">
              Success edit product
            </p>
            <p class="text-sm font-normal text-gray-600">
              Your product has been edited
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

export default ProductEdit;
