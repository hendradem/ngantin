import { useEffect, useState } from "react";
import MainLayout from "../../layouts/main/main";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HiShoppingCart } from "react-icons/hi";
import { url } from "../../api";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoadingButton from "../../components/partials/loadingButton";
import {
  HiHeart,
  HiStar,
  HiOutlineHeart,
  HiShoppingBag,
  HiFire,
} from "react-icons/hi";

const HomePage = () => {
  const auth = useSelector((state) => state.auth);
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addToCartLoading, setAddToCartLoading] = useState();

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
    <div className="w-full h-screen">
      <MainLayout navTitle="Home">
        <div className="mx-3 mt-5">
          <div class="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 text-xl flex items-center justify-center font-bold">
              A
            </div>
            <div className="flex flex-col space-y-0">
              <p className="font-medium text-gray-900">Hi, {auth?.name}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {auth?.email}
              </p>
            </div>
          </div>

          <LazyLoadImage
            src="https://firebasestorage.googleapis.com/v0/b/canteen-4d03f.appspot.com/o/assets%2Fpromobanner.png?alt=media&token=b4769ba9-cda5-47fa-8f34-3ecbfbe6cb22"
            effect="blur"
            alt=""
            width="100%"
            height="170px"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            className="rounded-xl"
          />

          <div>
            <div className="w-full mt-3 flex justify-between items-center">
              <h1 className="text-gray-900 text-md font-medium">
                Quick access
              </h1>
              <a className="text-blue-500 font-normal" href="" alt=""></a>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="h-[80px] w-[80px] cursor-pointer bg-orange-50 rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <HiShoppingCart className="text-orange-500" size={25} />
                  <span className="text-orange-500 text-sm">Foods</span>
                </div>
              </div>
              <div className="h-[80px] w-[80px] cursor-pointer bg-teal-50 rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <HiShoppingCart className="text-teal-500" size={25} />
                  <span className="text-teal-500 text-sm">Drinks</span>
                </div>
              </div>
              <div className="h-[80px] w-[80px] cursor-pointer bg-blue-50 rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <HiShoppingBag className="text-blue-500" size={25} />
                  <span className="text-blue-500 text-sm">Snack</span>
                </div>
              </div>
              <div className="h-[80px] w-[80px] cursor-pointer bg-purple-50 rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <HiFire className="text-purple-500" size={25} />
                  <span className="text-purple-500 text-sm">Foods</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="w-full mt-3 flex justify-between items-center">
              <h1 className="text-gray-900 text-md font-medium">
                Featured products
              </h1>
              <a className="text-blue-500 font-normal" href="" alt="">
                see all
              </a>
            </div>
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
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default HomePage;
