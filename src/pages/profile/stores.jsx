import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainLayout from "../../layouts/main/main";
import ProfileHeader from "../../components/profile/profileHeader";
import axios from "axios";
import { url } from "../../api";
import { ToggleSwitch } from "flowbite-react";
import { RiStore2Fill } from "react-icons/ri";
import StoreBottomSheet from "../../components/partials/storeBottomSheet";
import Skeleton from "react-loading-skeleton";

function Stores() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [activateStore, setActivateStore] = useState(false);

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

  const fetchStoresData = () => {
    axios
      .post(`${url}/getstore`, { user_email: auth.email })
      .then(function (res) {
        setStores(res.data.message);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchStoresData();
  }, [onBottomSheetClose]);

  return (
    <MainLayout navTitle="Profile">
      <div className="max-w-md bg-white">
        <ProfileHeader />
        <main className="w-full p-4">
          <div className="flex align-middle justify-between">
            <h5 className="font-medium text-sm text-gray-900"></h5>
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="py-2 px-3.5 flex items-center justify-center text-sm font-medium text-gray-700 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-0 focus:ring-gray-200"
            >
              <RiStore2Fill className="mr-2" /> Create your new store
            </button>
          </div>
          {isLoading ? (
            renderSkeletonLoading()
          ) : (
            <>
              <div className="mt-4">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 dark:border-gray-700">
                  {stores.length >= 1 && (
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-lg font-semibold leading-none text-gray-500 dark:text-white">
                        Your stores
                      </h5>
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        View all
                      </a>
                    </div>
                  )}
                  {stores.length >= 1 ? (
                    stores.map((item) => {
                      return (
                        <div className="flow-root" key={item.id}>
                          <ul
                            role="list"
                            className="divide-y divide-gray-200 dark:divide-gray-700 mt-2"
                          >
                            <li className="py-2 border border-gray-100 px-3 rounded-md">
                              <div className="flex items-center space-x-4">
                                <div className="bg-orange-100 rounded-full p-3">
                                  <RiStore2Fill
                                    size={18}
                                    className="text-orange-500"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {item.store_name}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {item.user_email}
                                  </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                  <ToggleSwitch
                                    checked={activateStore}
                                    onChange={function () {
                                      setActivateStore(!activateStore);
                                    }}
                                  />
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

export default Stores;
