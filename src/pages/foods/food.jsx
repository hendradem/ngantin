import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import MainLayout from "../../layouts/main/main";
import SearchBox from "../../components/foods/SearchBox";
import { url } from "../../api";
import { useSelector } from "react-redux";
import { HiHeart, HiStar, HiOutlineHeart } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";

import LoadingButton from "../../components/partials/loadingButton";

function FoodPage() {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addToCartLoading, setAddToCartLoading] = useState();
  const auth = useSelector((state) => state.auth);

  const addToWishlist = (product_code) => {
    axios
      .post(`${url}/addWishlist`, { product_code, id_user: auth?.email })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Product added to favourite", {
            duration: 1200,
            position: "top-center",
          });
          getFoodsData();
        } else {
          toast.error("Failed", {
            duration: 1200,
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFromWishlist = (product_code) => {
    axios
      .delete(`${url}/deleteWishlist/${product_code}`)
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Product removed to favourite", {
            duration: 1200,
            position: "top-center",
          });
          getFoodsData();
        } else {
          toast.error("Failed", {
            duration: 1200,
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const wishlistToggle = (item) => {
    if (item.isWishlisted) {
      removeFromWishlist(item.product_code);
    } else {
      addToWishlist(item.product_code);
    }
  };

  const addToCart = (item) => {
    setAddToCartLoading(item.id);
    axios
      .post(`${url}/addToCart`, {
        product_code: item.product_code,
        id_user: auth?.email,
        quantity: 1,
      })
      .then(function (res) {
        if (res.data.message === "success") {
          setAddToCartLoading(null);
          toast.success("Product added to cart", {
            duration: 1000,
            position: "top-center",
          });
        } else {
          setAddToCartLoading(null);
          toast.error("Failed", {
            duration: 1000,
            position: "top-center",
          });
        }
      })
      .catch((e) => {
        console.log(e);
        setAddToCartLoading(null);
      });
  };

  const getFoodsData = () => {
    axios
      .post(`${url}/products`, { IDUser: auth?.email })
      .then(function (res) {
        if (res.data.message.length == 1) {
          setFoods(res.data.message[0]);
        } else {
          setFoods(res.data.message);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFoodsData();
  }, []);

  return (
    <MainLayout navTitle="Browse foods">
      <div className="p-2 pb-[100px]">
        <SearchBox />

        <div className="grid grid-cols-2 gap-2">
          {foods?.length >= 1
            ? foods?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="max-w-sm bg-white mt-[10px] rounded-md shadow-sm border-gray-100 relative"
                  >
                    <div className="relative z-40 ">
                      <span className="bg-yellow-100 absolute left-0 text-yellow-800 m-2 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
                        {item.stock} left
                      </span>
                      <button
                        onClick={() => {
                          wishlistToggle(item);
                        }}
                        type="button"
                        className="text-gray-600 absolute right-0 m-2 p-1 bg-white border  focus:outline-none hover:bg-gray-100 focus:ring-none focus:ring-gray-200 font-medium rounded-full text-md "
                      >
                        {item.isWishlisted ? (
                          <HiHeart size={20} className="text-red-500" />
                        ) : (
                          <HiOutlineHeart size={20} />
                        )}
                      </button>
                    </div>
                    <div>
                      <LazyLoadImage
                        src={item.image}
                        effect="blur"
                        alt=""
                        width="100%"
                        height="170px"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        className="rounded-t-md"
                      />
                    </div>

                    <div className="px-2">
                      <div className="w-full inline-flex items-center justify-between">
                        <h5 className="text-md font-medium tracking-tight text-gray-800">
                          {item.title}
                        </h5>
                        <div className="inline-flex items-center">
                          <HiStar size={16} className="text-yellow-300" />
                          <span className="text-xs text-gray-500 font-medium ml-1">
                            (3.5/5)
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-orange-400">
                          Rp {item.price}
                        </span>
                      </div>

                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(item);
                          }}
                          className="text-gray-600 w-full  bg-white hover:bg-gray-100 border border-gray-100 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center justify-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
                        >
                          Add to cart
                          {addToCartLoading == item.id && (
                            <LoadingButton loadingMessage="Adding..." />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 gap-2">
            <Skeleton
              height={220}
              className="w-full h-full m-0 border-radius-lg max-w-sm"
            />
            <Skeleton
              height={220}
              className="w-full h-full m-0 border-radius-lg max-w-sm"
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default FoodPage;
