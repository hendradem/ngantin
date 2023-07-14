import { useState } from "react";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/actions/productActions";
import { HiHeart, HiStar, HiOutlineHeart } from "react-icons/hi";

import axios from "axios";
import { url } from "../../api";
import { useEffect } from "react";

export default function FoodCard(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [foodsData, setFoodsData] = useState([]);
  const [selectedWishlist, setSelectedWishlist] = useState("");
  const [isAddToWishlistLoading, setIsAddToWishlistLoading] = useState(false);

  let cartData = [];
  const handleClick = (item, index) => {
    item.qty = 1;
    const findProductId = cartData.find((product) => product.id === item.id);
    if (findProductId) {
      const findProductIndex = cartData.findIndex(
        (data) => data.id === item.id
      );
      cartData[findProductIndex].qty++;
    } else {
      cartData.push(item);
    }
    dispatch(addToCart(cartData));
    toast("Product added", {
      duration: 700,
      position: "bottom-center",
      icon: "😊",
    });
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

  const getWishlist = () => {
    axios
      .post(`${url}/getWishlist`, { id_user: auth?.email })
      .then((res) => {
        setSelectedWishlist(res.data.message[0].product_code);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getWishlist();
    setFoodsData(props.data);
  }, [props.data]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {foodsData?.map((item, index) => {
          return (
            <div
              key={index}
              className="max-w-sm bg-white mt-[10px] rounded-md shadow-sm border-gray-100 relative"
            >
              <div className="relative">
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
              <div style={style.imageContainer}>
                <img
                  className="rounded-t-md object-cover"
                  src={item.image}
                  alt=""
                  style={style.imageThumbnail}
                />
              </div>

              <div className="p-2">
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
                      handleClick(item);
                    }}
                    className="text-gray-600 w-full  bg-white hover:bg-gray-100 border border-gray-100 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center justify-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const style = {
  imageContainer: {
    width: "100%",
    height: "180px",
  },
  imageThumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
