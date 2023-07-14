import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/main/main";
import Overview from "./overview";
import ProductManagement from "./productManagement/productManagement";

import { useSelector, useDispatch } from "react-redux";
import { HiUserCircle } from "react-icons/hi";
import { signOut } from "../../store/actions/authActions";

import ProfileHeader from "../../components/profile/profileHeader";

function ProfilePage() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showOverview, setShowOverview] = useState(true);
  const [showProducts, setShowProducts] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(signOut());
  };

  return (
    <MainLayout navTitle="Profile">
      <div class="pt-12 max-w-md bg-white dark:bg-gray-800 dark:border-gray-700">
        <ProfileHeader />
        <main></main>
      </div>
    </MainLayout>
  );
}

export default ProfilePage;
