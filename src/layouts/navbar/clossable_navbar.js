import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { HiArrowNarrowLeft } from "react-icons/hi";

import { NavLink } from "react-router-dom";

function ClossableNavbar(props) {
  return (
    <>
      <nav class="bg-white fixed w-full top-0 px-5 py-3 m-0 border-b border-b-gray-100">
        <div class="container flex flex-wrap mx-auto items-center content-center">
          <NavLink to={`/${props.from}`} class="flex text-gray-600">
            <HiArrowNarrowLeft size={20} />
          </NavLink>
          <p class="ml-4 text-md font-semibold text-gray-600">{props.title}</p>
        </div>
      </nav>
    </>
  );
}

export default ClossableNavbar;
