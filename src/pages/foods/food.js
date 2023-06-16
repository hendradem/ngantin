import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import axios from "axios";

import MainLayout from "../../layouts/main/main";
import FoodCard from "../../components/foods/FoodCard";
import SearchBox from "../../components/foods/SearchBox";
import { url } from "../../api";

function FoodPage() {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${url}/products`, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "same-origin",
      })
      .then(function (res) {
        setFoods(res.data.message);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <MainLayout navTitle="Browse foods">
      <div class="p-2 pb-[100px]">
        <SearchBox />
        <FoodCard data={foods} />

        {isLoading && (
          <div class="grid grid-cols-2 gap-2">
            <Skeleton
              height={210}
              class="w-full h-full m-0 border-radius-lg max-w-sm"
            />
            <Skeleton
              height={210}
              class="w-full h-full m-0 border-radius-lg max-w-sm"
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default FoodPage;
