import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../api/index";

import MainLayout from "../../layouts/main/main";
import Skeleton from "react-loading-skeleton";
import emptyIllustration from "../../assets/images/illustration/notfound.svg";
import { HiOutlinePlus, HiOutlineMinus, HiTrash } from "react-icons/hi";

import { toast } from "react-hot-toast";
import { Checkbox } from "flowbite-react";

function CartPage() {
  const navigate = useNavigate();
  const product = useSelector((state) => state.product);
  const auth = useSelector((state) => state.auth);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const renderSkeletonLoading = () => {
    return (
      <div className="mt-8 mx-3">
        <div className="mb-2 flex items-center justify-between">
          <Skeleton
            height={15}
            width={100}
            className="w-full h-full m-0 rounded-lg"
          />
          <Skeleton
            height={15}
            width={30}
            className="w-full h-full m-0 rounded-lg"
          />
        </div>
        <Skeleton height={90} className="w-full h-full m-0 rounded-lg" />
        <Skeleton height={90} className="w-full h-full m-0 rounded-lg" />
        <div className="mt-3 flex items-center justify-between">
          <Skeleton
            height={40}
            width={100}
            className="w-full h-full m-0 rounded-lg"
          />
          <Skeleton
            height={40}
            width={200}
            className="w-full h-full m-0 rounded-lg"
          />
        </div>
      </div>
    );
  };

  const getCart = () => {
    setIsLoading(true);
    axios
      .post(`${url}/getCart`, { id_user: auth?.email })
      .then(function (res) {
        setCart(res.data.message[0]);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };
  const deleteCart = (id) => {
    axios
      .delete(`${url}/deleteCart/${id}/${auth?.email}`)
      .then(function (res) {
        if (res.data.message === "success") {
          getCart();
          toast.success("Product removed", {
            duration: 1000,
            position: "top-center",
          });
        } else {
          toast.error("Failed", {
            duration: 1000,
            position: "top-center",
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const updateCart = (type, latestQty, product_code) => {
    axios
      .post(`${url}/updateCart`, {
        update_type: type,
        latest_qty: latestQty,
        product_code,
        id_user: auth?.email,
      })
      .then(function (res) {
        getCart();
        if (res.data.message == "success") {
          getCart();
        } else {
          toast.error("Failed", {
            duration: 1000,
            position: "top-center",
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const calculateTotalNominal = () => {
    var total = 0;
    cart?.map((item) => {
      total += +item.price * +item.quantity;
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    getCart();
    calculateTotalNominal();
  }, []);

  useEffect(() => {
    calculateTotalNominal();
  }, [cart]);

  return (
    <div>
      <MainLayout>
        <main>
          {cart?.length > 0 && (
            <div className="m-3 mb-5 mt-8 flex items-center justify-between">
              <h5 className="text-lg font-semibold leading-none text-gray-700 dark:text-white">
                Your cart
              </h5>
              <Checkbox />
            </div>
          )}
          {cart?.length > 0 ? (
            cart?.map((item, index) => {
              return (
                <div key={index} className="-mt-5">
                  <div key={item.title} className="p-3">
                    <div className="flex border border-gray-100 shadow-sm w-full rounded-lg p-2 mt-1">
                      <div style={style.imageContainer} className="flex-none">
                        <img
                          className="rounded-md"
                          src={item.image}
                          style={style.imageThumbnail}
                        />
                      </div>
                      <div className="ml-3 flex-1 w-64 pt-1">
                        <h6 className="text-gray-600 text-md font-semibold">
                          {item.title}
                        </h6>
                        <h6 className="text-orange-400 text-sm font-medium">
                          Rp {item.price * item.quantity}
                        </h6>
                        <p className="text-xs font-reguler text-gray-400">
                          Total: {item.quantity}
                        </p>
                      </div>
                      <div className="ml-2 flex w-32 flex-grow-0 items-center justify-end pt-1">
                        <div className="flex items-center border px-1 border-gray-100 shadow-xs rounded-full">
                          {item.quantity > 1 ? (
                            <button
                              type="button"
                              onClick={() => {
                                updateCart(
                                  "decrease",
                                  item.quantity,
                                  item.product_code
                                );
                              }}
                              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center leading-10 text-gray-600 transition hover:opacity-75"
                            >
                              <HiOutlineMinus size={19} />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                deleteCart(item.product_code);
                              }}
                              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center leading-10 text-gray-600 transition hover:opacity-75"
                            >
                              <HiTrash size={19} />
                            </button>
                          )}

                          <input
                            type="number"
                            value={item.quantity}
                            className="h-10 w-12 border-transparent text-center focus:border-none focus:ring-0 [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                          />

                          <button
                            type="button"
                            onClick={() => {
                              updateCart(
                                "increase",
                                item.quantity,
                                item.product_code
                              );
                            }}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center leading-10 text-gray-600 transition hover:opacity-75"
                          >
                            <HiOutlinePlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 mt-10 flex flex-col items-center">
              <img src={emptyIllustration} className="mb-2 w-[70%]" />
              <p className="text-lg font-medium text-center text-gray-800">
                Your cart is empty
              </p>

              <NavLink to="/foods">
                <button
                  className="text-white w-full mt-4 bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
                  type="button"
                >
                  Explore Foods
                </button>
              </NavLink>
            </div>
          )}

          {cart.length > 0 && (
            <div className="w-full flex border-t-gray-100 px-4 py-2">
              <div className="flex-1 w-32">
                <span className="font-reguler text-sm text-gray-400 m-0">
                  Total price:
                </span>
                <h6 className="font-bold text-gray-600 text-md m-0 -mt-1">
                  Rp {totalPrice}
                </h6>
              </div>

              <button
                className="text-white flex-1 w-64 bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-md px-5 py-2.5 mr-2focus:outline-none"
                type="button"
                onClick={() => {
                  navigate(`/checkout/payment`);
                }}
              >
                Proceed to checkout
              </button>
            </div>
          )}
        </main>
      </MainLayout>
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

export default CartPage;
