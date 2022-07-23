import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import CardProductList from "./CardProductList";

import MainLayout from "../../../layouts/main/main";
import ProfileHeader from "../../../components/profile/profileHeader";

import axios from "axios";
import { url } from "../../../api";

function ProductManagement() {
  const auth = useSelector((state) => state.auth);
  const email = auth.email;

  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sellerActivated, setSellerActivated] = useState(false);

  const onActivateSellerMode = () => {
    axios
      .post(`${url}/activateSellerMode`, { email })
      .then(function (res) {
        if (res) setSellerActivated(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    axios
      .post(`${url}/product`, { email })
      .then(function (res) {
        setFoods(res.data.message);
        setIsLoading(false); 
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <MainLayout navTitle="Profile">
      <div class="pt-12 pb-12 max-w-sm bg-white">
        <ProfileHeader />

        <main>
          <div class="p-3">
            <div class="flex align-middle justify-between">
              <h5 class="font-medium text-sm text-gray-900"></h5>
              <NavLink to="/profile/product/add">
                <button
                  type="button"
                  class="py-2 px-3.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                >
                  Add product
                </button>
              </NavLink>
            </div>

            <div class="cardList mt-4">
              <CardProductList data={foods} />
              {isLoading && (
                <div class="grid">
                  <div class="col-start-1 col-end-7">
                    <Skeleton
                      height={80}
                      class="w-full h-full m-0 border-radius-lg max-w-sm"
                    />
                  </div>
                  <div class="col-start-1 col-end-7">
                    <Skeleton
                      height={80}
                      class="w-full h-full m-0 border-radius-lg max-w-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}

export default ProductManagement;
