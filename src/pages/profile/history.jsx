import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainLayout from "../../layouts/main/main";
import ProfileHeader from "../../components/profile/profileHeader";
import axios from "axios";
import { url } from "../../api";
import { RiStore2Fill } from "react-icons/ri";
import StoreBottomSheet from "../../components/partials/storeBottomSheet";
import Skeleton from "react-loading-skeleton";
import moment from "moment/moment";

function History() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const onBottomSheetClose = () => {
    setOpen(false);
  };
  const onBottomSheetOpen = () => {
    setOpen(true);
  };
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

  const getTransactions = () => {
    axios
      .post(`${url}/getUserTransactions`, { id_user: auth?.email })
      .then(function (res) {
        console.log(res);
        setTransactions(res.data.message[0]);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getTransactions();
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
                <div className="w-full max-w-md bg-white dark:bg-gray-800 dark:border-gray-700">
                  {transactions?.length >= 1 && (
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-md font-semibold leading-none text-gray-700 dark:text-white">
                        Your buying histories
                      </h5>
                    </div>
                  )}
                  {transactions?.length >= 1 ? (
                    transactions?.map((item) => {
                      return (
                        <div className="flow-root" key={item.id}>
                          <ul
                            role="list"
                            className="divide-y divide-gray-100 mt-2"
                          >
                            <li className="py-2 border border-gray-100 px-3 shadow-sm rounded-md">
                              <div className="flex items-center space-x-4">
                                <div className="bg-orange-100 rounded-full p-3">
                                  <RiStore2Fill
                                    size={18}
                                    className="text-orange-500"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {item.title}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    <span>
                                      {moment(item.createdAt).format(
                                        "DD-MM-YYYY"
                                      )}{" "}
                                    </span>{" "}
                                    <span className="mr-2 font-medium text-orange-400">
                                      total: {item.price}
                                    </span>
                                  </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                  {item.payment_status == 1 ? (
                                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                      Success
                                    </span>
                                  ) : (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                      Pending
                                    </span>
                                  )}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                      role="alert"
                    >
                      <span className="font-medium">Data not found!</span> You
                      dont have any stores
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <StoreBottomSheet
            isOpen={open}
            onClose={onBottomSheetClose}
            onOpen={onBottomSheetOpen}
          />
        </main>
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

export default History;
