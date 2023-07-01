import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../../api/index";
import { toast } from "react-hot-toast";

function CardProductList({ data }) {
  const auth = useSelector((state) => state.auth);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(data);
  }, [data]);

  const onDeleteItem = (idProduct) => {
    const iduser = auth.email;

    axios
      .delete(`${url}/product/${idProduct}/${iduser}`)
      .then((res) => {
        setProduct(res.data.message);
        toast("Product deleted", {
          duration: 700,
          position: "bottom-center",
          icon: "✅",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error", {
          duration: 700,
          position: "bottom-center",
        });
      });
  };

  {
    return product.length > 0 ? (
      product.map((item) => {
        return (
          <div class="flex border border-gray-100 w-full rounded-md p-2 mt-2">
            <div style={style.imageContainer} class="flex-none">
              <img
                class="rounded-md"
                src={item.image}
                style={style.imageThumbnail}
              />
            </div>
            <div class="ml-3 flex-1 w-64 pt-1">
              <h6 class="text-gray-600 text-[14px] font-semibold">
                {item.title}
              </h6>
              <h6 class="text-blue-400 text-[13px] font-medium">
                Rp {item.price}
              </h6>
              <p class="text-xs font-reguler text-gray-400">
                Stock: {item.stock}
              </p>
            </div>
            <div class="ml-2 flex-1 w-32 flex-grow-0 justify-end pt-1">
              <NavLink to={`/profile/product/edit/${item.code}`}>
                <button
                  type="button"
                  class="px-2 py-1 w-full mb-1 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10    "
                >
                  Edit
                </button>
              </NavLink>

              <button
                type="button"
                onClick={() => {
                  onDeleteItem(item.id);
                }}
                class="px-2 py-1 w-full text-xs font-medium text-center text-white bg-amber-500 rounded-md hover:bg-amber-600  focus:outline-none   "
              >
                Delete
              </button>
            </div>
          </div>
        );
      })
    ) : (
      <div
        class="p-3 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg font-medium"
        role="alert"
      >
        Kamu belum punya produk untuk dijual
      </div>
    );
  }
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

export default CardProductList;
