import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import axios from "axios";
import { url } from "../../api/index";

import MainLayout from "../../layouts/main/main";

import ClossableNavbar from "../../layouts/navbar/clossable_navbar";
import Modal from "../../components/modal";
import HeadlessModal from "../../components/headlessModal";

import successIllustration from "../../assets/images/illustration/success.png";
import emptyIllustration from "../../assets/images/illustration/notfound.png";

const paymentOptions = [
  {
    id: "cash",
    name: "Cash / QRIS",
    icon: "https://firebasestorage.googleapis.com/v0/b/canteen-4d03f.appspot.com/o/bank%20logo%2Ficon.png?alt=media&token=36214437-19fc-4a87-89ab-16d796cad1c3",
    popular: true,
  },
  {
    id: "gopay",
    name: "Gopay",
    icon: "https://firebasestorage.googleapis.com/v0/b/canteen-4d03f.appspot.com/o/bank%20logo%2Ficon.png?alt=media&token=36214437-19fc-4a87-89ab-16d796cad1c3",
    popular: false,
  },
  {
    id: "shopee",
    name: "Shopee pay",
    icon: "https://firebasestorage.googleapis.com/v0/b/canteen-4d03f.appspot.com/o/bank%20logo%2Fshopeepay.png?alt=media&token=dc1a42a5-07db-4bf5-8a1b-b34b8e7151e6",
    popular: false,
  },
  {
    id: "ovo",
    name: "OVO",
    icon: "https://firebasestorage.googleapis.com/v0/b/canteen-4d03f.appspot.com/o/bank%20logo%2Funnamed.png?alt=media&token=a2b9df37-d3da-4b14-bbd5-52a4d2e75266",
    popular: false,
  },
];
const nominalOptions = [
  {
    title: "5K",
    nominal: 5000,
  },
  {
    title: "10K",
    nominal: 10000,
  },
  {
    title: "20K",
    nominal: 20000,
  },
  {
    title: "50K",
    nominal: 50000,
  },
  {
    title: "100K",
    nominal: 100000,
  },
];

function CartPage() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const auth = useSelector((state) => state.auth);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState();

  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();

  const [successModal, setSuccessModal] = useState(false);
  const [kembalian, setKembalian] = useState(0);

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [nominal, setNominal] = useState("");
  const [nominalKurang, setNominalKurang] = useState(false);

  useEffect(() => {
    setCart(product.cartData);
  }, [cart]);

  useEffect(() => {
    let total = 0;
    cart.map((item) => {
      total += +item.price * +item.qty;
      setTotalPrice(total);
    });
  }, [cart]);

  // payment method
  const handleOnCheckout = () => {
    setConfirmationModal(false);

    let transactionData = [];
    cart.map((item) => {
      let tmp = {
        id_product: item.id,
        id_user: item.id_user,
        quantity: item.qty,
        payment_method: selectedPaymentMethod,
        nominal_transaction: +item.price * +item.qty,
      };

      transactionData.push(tmp);
    });

    if (transactionData.length > 0) {
      axios
        .post(`${url}/transaction`, transactionData)
        .then((res) => {
          // console.log(res);
          if (res.data.message === "success") {
            calculateCharge();
            setSuccessModal(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const nominalVerification = (e) => {
    setNominal(e.target.value);
    let nominal = +e.target.value;
    if (nominal < +totalPrice) {
      setNominalKurang(true);
    } else {
      setNominalKurang(false);
    }
  };
  const calculateCharge = () => {
    let tmp = +nominal - +totalPrice;
    setKembalian(tmp);
  };

  const removeItem = (index) => {
    let newArr = cart.splice(index, 1);
    setCart(newArr);
  };

  return (
    <div>
      <MainLayout>
        {/* <ClossableNavbar title={"Your cart"} from={"foods"} /> */}
        <main class="pt-[70px]">
          {cart.length > 0 ? (
            cart.map((item, index) => {
              return (
                <div class="-mt-5">
                  <div key={item.title} class="p-3">
                    <div class="flex border border-gray-100 w-full rounded-md p-2 mt-1">
                      <div style={style.imageContainer} class="flex-none">
                        <img
                          class="rounded-md"
                          src={item.image}
                          style={style.imageThumbnail}
                        />
                      </div>
                      <div class="ml-3 flex-1 w-64 pt-1">
                        <h6 class="text-gray-600 text-md font-semibold">
                          {item.title} ({item.qty})
                        </h6>
                        <h6 class="text-orange-400 text-sm font-medium">
                          Rp {item.price}
                        </h6>
                        <p class="text-xs font-reguler text-gray-400">
                          Sisa: {item.stock}
                        </p>
                      </div>
                      <div class="ml-2 flex-1 w-32 flex-grow-0 justify-end pt-1">
                        <button
                          type="button"
                          class="px-2 py-1 w-full mb-1 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10    "
                        >
                          Add
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            removeItem(index);
                          }}
                          class="px-2 py-1 w-full text-xs font-medium text-center text-white bg-amber-500 rounded-md hover:bg-amber-600  focus:outline-none   "
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div class="p-6 flex flex-col items-center">
              <img src={emptyIllustration} class="mb-2 w-[70%]" />
              <p class="text-lg font-medium text-center text-gray-800">
                Your cart is empty
              </p>

              <NavLink to="/foods">
                <button
                  class="text-white w-full mt-4 bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
                  type="button"
                >
                  Explore Foods
                </button>
              </NavLink>
            </div>
          )}
        </main>
      </MainLayout>

      {/* modal */}
      {paymentModal && (
        <Modal title={"Select payment method"} setIsOpen={setPaymentModal}>
          <div class="p-6">
            <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Select payment method to complete your transaction
            </p>
            <ul class="my-4 space-y-3 ">
              {paymentOptions.map((item) => {
                return (
                  <li>
                    <button
                      onClick={() => {
                        setSelectedPaymentMethod(item.id);
                      }}
                      class={`flex w-full p-2.5 border  ${
                        selectedPaymentMethod === item.id
                          ? "border-gray-200"
                          : "border-gray-100"
                      } font-medium text-gray-600 bg-gray-50 rounded-md`}
                    >
                      <img
                        class="w-6 h-6 rounded-full bg-gray-50"
                        src={item.icon}
                      />
                      <span class="ml-3">{item.name}</span>
                      {item.popular && (
                        <span class="flex right-0 items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                          Popular
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            {selectedPaymentMethod && (
              <button
                class="text-white w-full mt-2 bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
                type="button"
                onClick={() => {
                  setPaymentModal(false);
                  setConfirmationModal(true);
                }}
              >
                Pay {totalPrice.toLocaleString()} with {selectedPaymentMethod}
              </button>
            )}
          </div>
        </Modal>
      )}

      {confirmationModal && (
        <Modal title="Confirmation" setIsOpen={setConfirmationModal}>
          <div class="p-6">
            <label
              for="email-address-icon"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Uangmu berapa?
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdOutlineAccountBalanceWallet class="text-gray-500" />
              </div>
              <input
                type="number"
                value={nominal}
                onChange={(e) => nominalVerification(e)}
                class={`${
                  nominalKurang
                    ? "bg-red-50 border border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500"
                    : "bg-gray-50 border border-gray-300"
                }  text-gray-900 text-sm  rounded-lg block w-full pl-10 p-2.5 `}
                placeholder="Masukin nominal uangmu"
              />
            </div>
            {nominalKurang && (
              <p class="ml-1 text-sm text-red-600 dark:text-red-500">
                Nominal uang kamu kurang!
              </p>
            )}
            {/* <div class="flex mt-2">
              {nominalOptions.map((item) => {
                return (
                  <button
                    onClick={() => {
                      setNominalInput(item.nominal);
                      nominalVerification(item.nominal);
                    }}
                    class="bg-gray-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold mr-1 px-2.5 py-0.5 rounded w-full"
                  >
                    {item.title}
                  </button>
                );
              })}
            </div> */}

            {!nominalKurang && (
              <button
                class="text-white w-full mt-7 bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
                type="button"
                onClick={() => {
                  handleOnCheckout();
                }}
              >
                Pay now
              </button>
            )}
          </div>
        </Modal>
      )}

      {successModal && (
        <HeadlessModal setIsOpen={setSuccessModal}>
          <div class="p-6 flex flex-col items-center">
            <img src={successIllustration} class="mb-2 w-[70%]" />
            <p class="text-lg font-medium text-center text-gray-800">
              Transaction Success
            </p>
            <p class="text-sm font-normal text-gray-600">
              {kembalian == 0
                ? "Your money is by the bill 👍"
                : `Please take your change of IDR ${kembalian.toLocaleString()}`}
            </p>

            <NavLink to="/foods" class="w-full">
              <button
                class="text-white w-full mt-7 bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
                type="button"
              >
                Back to home
              </button>
            </NavLink>
          </div>
        </HeadlessModal>
      )}
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
