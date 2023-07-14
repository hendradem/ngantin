import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/main/main";
import { HiCheckCircle, HiCheck, HiEmojiHappy } from "react-icons/hi";
import { MdDocumentScanner, MdPayment } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Modal } from "flowbite-react";
import { url } from "../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-hot-toast";
import LoadingButton from "../../components/partials/loadingButton";

const paymentOptions = [
  {
    id: "cash-qris",
    name: "Cash / QRIS",
    icon: "https://firebasestorage.googleapis.com/v0/b/canteen-4d03f.appspot.com/o/bank%20logo%2Ficon.png?alt=media&token=36214437-19fc-4a87-89ab-16d796cad1c3",
    popular: true,
    description: "Pay with cash or offline QRIS Barcode",
  },
  {
    id: "ewallet",
    name: "E-Wallet",
    icon: "https://firebasestorage.googleapis.com/v0/b/canteen-4d03f.appspot.com/o/bank%20logo%2Ficon.png?alt=media&token=36214437-19fc-4a87-89ab-16d796cad1c3",
    popular: false,
    description: "Pay with e-wallet (Ovo, Dana, Bank transfer)",
  },
];
function Payment() {
  const [cart, setCart] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [totalPrice, setTotalPrice] = useState();
  const [stores, setStores] = useState([]);
  const [addTransactionLoading, setAddTransactionLoading] = useState(false);
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [paymentConfirmModal, setPaymentConfirmModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();

  const getCart = () => {
    axios
      .post(`${url}/getCart`, { id_user: auth?.email })
      .then(function (res) {
        setCart(res.data.message[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getStore = () => {
    axios
      .post(`${url}/getstore`, { user_email: auth?.email })
      .then(function (res) {
        setStores(res.data.message[0]);
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

  const handlePayment = (method) => {
    if (method == "cash-qris") {
      setPaymentConfirmModal(true);
    }
  };

  const handleOnCheckout = () => {
    setAddTransactionLoading(true);
    let transactionData = [];
    cart?.map((item) => {
      let tmp = {
        product_code: item.product_code,
        id_user: item.id_user,
        quantity: item.quantity,
        payment_method: selectedPaymentMethod,
        nominal_transaction: +item.price * +item.quantity,
        id_store: stores.id_store,
        payment_status: 1,
      };

      transactionData.push(tmp);
    });

    if (transactionData.length > 0) {
      axios
        .post(`${url}/transaction`, transactionData)
        .then((res) => {
          if (res.data.message === "success") {
            toast.success("Transaction success", {
              duration: 1000,
              position: "top-center",
            });
            deleteCartBatch();
            setAddTransactionLoading(false);
            setPaymentConfirmModal(false);
            setPaymentMethodModal(false);
            setTransactionSuccess(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setAddTransactionLoading(false);
        });
    }
  };

  const deleteCartBatch = () => {
    axios
      .delete(`${url}/deleteCartBatch/${auth?.email}`)
      .then(function (res) {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCart();
    getStore();
  }, []);

  useEffect(() => {
    calculateTotalNominal();
  }, [cart]);

  return (
    <MainLayout hideBottomNav={true}>
      <div className="w-full">
        <div className="w-full flex items-center justify-between bg-black px-3 py-3">
          <NavLink to="/cart">
            <button className="text-gray-300">cancel</button>
          </NavLink>
          <p className="text-gray-200 font-normal">Checkout page</p>
          <p className="text-black font-medium">save</p>
        </div>
        <div className="w-full flex items-center justify-between bg-gray-50 border-b border-gray-100 px-8 py-3">
          <ul className="flex items-center justify-between w-full">
            <li>
              <button className="cursor-default disabled flex gap-2 items-center justify-center">
                <span className="p-2 text-sm flex items-center justify-center rounded-full bg-green-400 text-white">
                  <HiCheck />
                </span>
                <span className="font-medium text-sm text-gray-700">
                  Orders
                </span>
              </button>
            </li>
            <li>
              <button className="cursor-default disabled flex gap-2 items-center justify-center">
                <span
                  className={`p-2 text-sm flex items-center justify-center rounded-full ${
                    transactionSuccess
                      ? "bg-green-400 text-white"
                      : "bg-gray-200 text-gray-600"
                  } `}
                >
                  {transactionSuccess ? <HiCheck /> : <MdPayment />}
                </span>
                <span className="font-medium text-sm text-gray-700">
                  Payment
                </span>
              </button>
            </li>
            <li>
              <button className="cursor-default disabled flex gap-2 items-center justify-center">
                <span
                  className={`p-2 text-sm flex items-center justify-center rounded-full ${
                    transactionSuccess
                      ? "bg-green-400 text-white"
                      : "bg-gray-200 text-gray-600"
                  } `}
                >
                  <HiEmojiHappy />
                </span>
                <span className="font-medium text-sm text-gray-700">
                  Success
                </span>
              </button>
            </li>
          </ul>
        </div>

        <div className="m-4">
          {cart?.length > 0 && !transactionSuccess ? (
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your orders
            </label>
          ) : (
            ""
          )}

          {cart?.length > 0 && !transactionSuccess
            ? cart?.map((item, index) => {
                return (
                  <div key={index} className="p-0 mb-2">
                    <div className="">
                      <div className="flex border border-gray-100 shadow-sm w-full rounded-lg p-1 mt-1">
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
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>

        {cart?.length > 0 && !transactionSuccess ? (
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
                setPaymentMethodModal(true);
              }}
            >
              Select payment
            </button>
          </div>
        ) : (
          ""
        )}

        {transactionSuccess ? (
          <div className="px-4 py-2 mt-10 flex flex-col items-center justify-center">
            <div className="p-2 rounded-full border border-green-200">
              <HiCheckCircle className="text-[50px] text-green-400" />
            </div>
            <h5 className="text-gray-900 text-center font-semibold text-xl mt-3">
              Transactions success <br /> enjoy your food
            </h5>
            <NavLink to="/foods">
              <button
                className="text-white w-auto mt-5 bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
                type="button"
              >
                Back to home
              </button>
            </NavLink>
          </div>
        ) : (
          ""
        )}

        <Modal
          show={paymentMethodModal}
          onClose={() => {
            setPaymentMethodModal(false);
          }}
          size={"md"}
        >
          <Modal.Header>Payment method</Modal.Header>
          <Modal.Body>
            <div className="p-0">
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Select payment method to complete your transaction
              </p>
              <div className="my-4 flex flex-row gap-2">
                {paymentOptions.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedPaymentMethod(item.id);
                      }}
                      className={` w-full cursor-pointer p-2.5 border  ${
                        selectedPaymentMethod === item.id
                          ? "border-gray-200"
                          : "border-gray-100"
                      }  bg-gray-50 rounded-md`}
                    >
                      <div className="flex flex-row">
                        <img
                          className="w-6 h-6 rounded-full bg-gray-50"
                          src={item.icon}
                        />
                        <span className="ml-3 font-medium text-gray-600">
                          {item.name}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              {selectedPaymentMethod && (
                <button
                  className="text-white w-full mt-2 bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
                  type="button"
                  onClick={() => {
                    handlePayment(selectedPaymentMethod);
                  }}
                >
                  Pay {totalPrice.toLocaleString()} with {selectedPaymentMethod}
                </button>
              )}
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={paymentConfirmModal}
          onClose={() => {
            setPaymentConfirmModal(false);
          }}
          size={"md"}
        >
          <Modal.Body>
            <div className="p-0">
              <div className="w-full flex items-center justify-center">
                <div className="w-16 h-16 -mt-12 flex items-center justify-center bg-blue-50 rounded-full shadow-sm border-2 border-blue-100">
                  <MdDocumentScanner size={25} className="text-blue-400" />
                </div>
              </div>
              <p className="text-xl text-center mt-3  text-gray-800 font-medium dark:text-gray-400">
                Scan QR Code
              </p>
              <p className="text-md mt-1 text-center text-gray-700">
                Scan this code with QRIS supported apps
              </p>
              <p className="text-center text-3xl font-bold mt-2 text-orange-500">
                Rp {totalPrice ? totalPrice.toLocaleString() : ""}
              </p>
              <div className=" flex flex-row gap-2">
                <LazyLoadImage
                  src="https://chart.googleapis.com/chart?cht=qr&chl=http%3A%2F%2Ftokopedia.com&chs=180x180&choe=UTF-8&chld=L|2"
                  effect="blur"
                  alt=""
                  width="100%"
                  height="auto"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  className="rounded-t-md"
                />
              </div>
              <div>
                <button
                  className="text-white w-full mt-2 bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
                  type="button"
                  onClick={() => {
                    handleOnCheckout();
                  }}
                >
                  {addTransactionLoading ? (
                    <LoadingButton loadingMessage="Adding..." />
                  ) : (
                    <>
                      I already paid Rp
                      {totalPrice ? totalPrice.toLocaleString() : ""}
                    </>
                  )}
                </button>
                <p
                  onClick={() => {
                    setPaymentConfirmModal(false);
                  }}
                  className="text-center cursor-pointer text-gray-500 mt-2"
                >
                  cancel
                </p>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </MainLayout>
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

export default Payment;
