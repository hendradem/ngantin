import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Layout from "./layout";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { url } from "../../api";
import ProductAddModal from "../../components/profile/productAddModal";
import ProductEditModal from "../../components/profile/productEditModal";
import {
  RiDeleteBin6Fill,
  RiSettings3Fill,
  RiAddFill,
  RiSearchLine,
  RiRefreshLine,
} from "react-icons/ri";

const Transactions = () => {
  const auth = useSelector((state) => state.auth);

  const [transactions, setTransactions] = useState([]);
  const [store, setStore] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // modal state
  let [addProductModal, setAddProductModal] = useState(false);
  let [editProductModal, setEditProductModal] = useState(false);

  const getStore = () => {
    axios
      .post(`${url}/getstore`, { user_email: auth.email })
      .then(function (res) {
        setStore(res.data.message[0].id_store);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getTransactions = () => {
    axios
      .post(`${url}/getTransactions`, { IDStore: store })
      .then(function (res) {
        setTransactions(res.data.message[0]);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getStore();
  }, []);

  useEffect(() => {
    getTransactions();
  }, [store]);

  return (
    <Layout>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
          <div>
            <button
              type="button"
              className="px-3 py-2 mr-2 text-sm font-medium text-center inline-flex items-center text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 focus:ring-0 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <RiRefreshLine size={21} />
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <RiSearchLine />
            </div>
            <input
              type="text"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search products"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Payment method
              </th>
              <th scope="col" className="px-6 py-3">
                Payment status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-md"
                      src={transaction.image}
                      alt="Jese image"
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {transaction.title}
                      </div>
                      <div className="font-normal text-gray-500">
                        {transaction.product_code}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-2">{transaction.quantity}</td>
                  <td className="px-6 py-2">
                    {transaction.nominal_transaction}
                  </td>
                  <td className="px-6 py-2">{transaction.payment_method}</td>
                  <td className="px-6 py-2">
                    {transaction.payment_status === 1 ? (
                      <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        Paid
                      </span>
                    ) : (
                      <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                        Unpaid
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-2">
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <RiDeleteBin6Fill size={20} />
                    </button>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <RiSettings3Fill size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ProductAddModal
        isOpen={addProductModal}
        onClose={() => {
          setAddProductModal(false);
        }}
      />
      <ProductEditModal
        isOpen={editProductModal}
        product={product}
        onClose={() => {
          setEditProductModal(false);
        }}
      />
    </Layout>
  );
};

export default Transactions;
