import React from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaBasketShopping } from "react-icons/fa6";



function HomeNavbar() {
  return (
    <nav className="block fixed top-4 left-0 right-0 z-50 w-full max-w-screen-xl px-6 py-3 mx-auto text-black bg-white border shadow-md rounded-xl border-white/80  backdrop-blur-2xl backdrop-saturate-200">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link
          href="/"
          className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased"
        >
          E-Shop
        </Link>
        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <Link
                to={"/"}
                className="flex items-center transition-colors hover:text-gray-700"
              >
                Home
              </Link>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <Link
                to={"/products-page"}
                className="flex items-center transition-colors hover:text-gray-700"
              >
                Products
              </Link>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <button
                className="flex items-center transition-colors hover:text-gray-700"
              >
               <FaBasketShopping className="w-6 h-6" />
              </button>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <Link
                to={"/login"}
                className="flex items-center transition-colors hover:text-gray-700"
              >
               <MdAccountCircle className="w-6 h-6" />
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;
