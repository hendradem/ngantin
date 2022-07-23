import { RiShoppingBagLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <nav class="bg-white border-b border-b-gray-100 px-5 py-3 m-0 fixed w-full z-10">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <span class="font-semibold text-gray-600 text-base">
            {props.title}
          </span> 
        </div>
      </nav>
    </>
  );
};

export default Navbar;
