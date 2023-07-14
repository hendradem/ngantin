import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../layouts/main/main";
import ProfileHeader from "../../components/profile/profileHeader";
import axios from "axios";
import { url } from "../../api";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HiStar, HiHeart, HiOutlineHeart } from "react-icons/hi";
import { toast } from "react-hot-toast";
import LoadingButton from "../../components/partials/loadingButton";

function Wishlists() {
  const auth = useSelector((state) => state.auth);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addToCartLoading, setAddToCartLoading] = useState();

  const renderSkeletonLoading = () => {
    return (
      <div className="mt-3">
        <Skeleton
          height={55}
          className="w-full h-full m-0 border-radius-lg max-w-sm"
        />
        <Skeleton
          height={55}
          className="w-full h-full m-0 border-radius-lg max-w-sm"
        />
      </div>
    );
  };

  const addToWishlist = (product_code) => {
    axios
      .post(`${url}/addWishlist`, { product_code, id_user: auth?.email })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Product added to favourite", {
            duration: 1200,
            position: "top-center",
          });
          fetchWishlistsData();
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
          fetchWishlistsData();
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

  const fetchWishlistsData = () => {
    axios
      .post(`${url}/getWishlists`, { IDUser: auth?.email })
      .then(function (res) {
        setWishlist(res.data.message);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
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

  useEffect(() => {
    fetchWishlistsData();
  }, []);

  return (
    <MainLayout navTitle="Profile">
      <div className="max-w-md bg-white">
        <ProfileHeader />
        <main className="w-full p-4">
          {isLoading ? (
            renderSkeletonLoading()
          ) : (
            <>
              <div className="mt-2">
                <div className="w-full max-w-md bg-white">
                  {wishlist.length >= 1 && (
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-md font-semibold leading-none text-gray-700">
                        Your favourites food
                      </h5>
                    </div>
                  )}

                  {isLoading && (
                    <div className="grid grid-cols-2 gap-2">
                      <Skeleton
                        height={210}
                        className="w-full h-full m-0 border-radius-lg max-w-sm"
                      />
                      <Skeleton
                        height={210}
                        className="w-full h-full m-0 border-radius-lg max-w-sm"
                      />
                    </div>
                  )}

                  {wishlist.length >= 1 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {wishlist?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="max-w-sm bg-white mt-[10px] rounded-md shadow-sm border-gray-100 relative"
                          >
                            <div className="relative z-30">
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
                                height="130px"
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
                                  <HiStar
                                    size={16}
                                    className="text-yellow-300"
                                  />
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
                      })}
                    </div>
                  ) : (
                    <div
                      className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                      role="alert"
                    >
                      <span className="font-medium">Data not found!</span> You
                      dont have any fav foods
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </MainLayout>
  );
}

const style = {
  imageContainer: {
    width: "100%",
    height: "100px",
  },
  imageThumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default Wishlists;
