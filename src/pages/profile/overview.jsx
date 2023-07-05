import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { url } from "../../api";
import MainLayout from "../../layouts/main/main";
import ProfileHeader from "../../components/profile/profileHeader";

import axios from "axios";

function Overview() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios
      .post(`${url}/getSales`, { id_user: auth.email })
      .then(function (res) {
        setSales(res.data.message[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <MainLayout navTitle="Profile">
      <div class="max-w-md bg-white">
        <ProfileHeader />
        <main class="w-full p-4">
          <ul class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              Today's sales: Rp {sales.nominalTransaction}
            </li>
            <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              Product sold: {sales.productSold}
            </li>
          </ul>
        </main>
      </div>
    </MainLayout>
  );
}

export default Overview;
