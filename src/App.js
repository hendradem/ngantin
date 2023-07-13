import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import HomePage from "./pages/home/home";
import FoodPage from "./pages/foods/food";
import ProfilePage from "./pages/profile/profile";
import Overview from "./pages/profile/overview";
import Product from "./pages/profile/productManagement/productManagement";
import ProductAdd from "./pages/profile/productManagement/productAdd";
import ProductEdit from "./pages/profile/productManagement/productEdit";

import RegisterPage from "./pages/auth/register/register";
import LoginPage from "./pages/auth/login/login";
import Payment from "./pages/checkout/payment";

import Stores from "./pages/profile/stores";
import CartPage from "./pages/checkout/cart";

import AdminPage from "./pages/admin/index";
import ProductsAdmin from "./pages/admin/products";
import Transactions from "./pages/admin/transactions";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/actions/authActions";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (!auth.name && !localStorage.getItem("token")) {
      navigate("/auth/login", { replace: true });
    }
  }, [auth]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/foods" element={<FoodPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/overview" element={<Overview />} />
        <Route path="/profile/stores" element={<Stores />} />
        <Route path="/profile/product" element={<Product />} />
        <Route path="/profile/product/add" element={<ProductAdd />} />
        <Route path="/profile/product/edit/:id" element={<ProductEdit />} />
        <Route path="/profile/admin" element={<AdminPage />} />
        <Route path="/profile/admin/products" element={<ProductsAdmin />} />
        <Route path="/profile/admin/transactions" element={<Transactions />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
