// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, useLocation } from "react-router-dom";

function AuthNavbar() {
  const location = useLocation();

  // Function to get the button text and route based on the current route
  const getButtonInfo = () => {
    switch (location.pathname) {
      case "/login":
        return { buttonText: "Register", route: "/register" };
      case "/register":
        return { buttonText: "Login", route: "/login" };
      default:
        return { buttonText: "Login", route: "/login" };
    }
  };
  const { buttonText, route } = getButtonInfo();

  return (
    <div className="w-full h-20 relative bg-white shadow flex justify-end items-center p-8 gap-8">

      <Link
        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        to={route}
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default AuthNavbar;
