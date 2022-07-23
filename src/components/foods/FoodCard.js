import { useState, useEffect } from "react"; 

import { RiHeart3Line, RiShoppingCart2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/actions/productActions";

export default function FoodCard(props) { 
  const [selectedItem, setSelectedItem] = useState([]);
  const dispatch = useDispatch();

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
  }; 

  return (
    <div>
      <div class="grid grid-cols-2 gap-2"> 

        {props.data.map((item) => {
          return (
            <div
              class="max-w-sm bg-white rounded-md border border-gray-100 relative"
              onClick={() => {
                handleClick(item);
              }}
            >
              <div class="relative">
                <span class="bg-yellow-100 absolute left-0 text-yellow-800 m-2 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
                  {item.stock} left
                </span>
                <button
                  type="button"
                  class="text-gray-600 absolute right-0 m-2 p-1 bg-white border  focus:outline-none hover:bg-gray-100 focus:ring-none focus:ring-gray-200 font-medium rounded-full text-md "
                >
                  <RiHeart3Line />
                </button>
              </div>
              <div style={style.imageContainer}>
                <img
                  class="rounded-t-md object-cover"
                  src={item.image}
                  alt=""
                  style={style.imageThumbnail}
                />
              </div>

              <div class="p-2">
                <h5 class="text-sm font-medium tracking-tight text-gray-800">
                  {item.title}
                </h5>
                <div class="flex justify-between items-center">
                  <span class="text-sm font-semibold text-orange-400">
                    Rp {item.price}
                  </span>
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
    height: "200px",
  },
  imageThumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
