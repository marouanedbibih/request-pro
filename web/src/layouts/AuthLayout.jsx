// eslint-disable-next-line no-unused-vars
import React from "react";
import { Outlet,Navigate } from "react-router";
import AuthNavbar from "../components/navbar/AuthNavbar";
import AuthContext from "../context/AuthContext";
import { useStateContext } from "../context/ContextProvider";

function AuthLayout() {
  const {token,role} = useStateContext();
  if (token) {
    if (role == "CLIENT") {
      return <Navigate to={`/profile`} />;
    } else if (role == "ADMIN") {
      return <Navigate to={`/clients`}/>;
    }
  }
  return (
    <div className="bg-light flex flex-col h-screen">
      {/* <div className="w-full h-20 relative bg-white shadow" /> */}
      <AuthNavbar />
      <div className="w-full flex-1 flex justify-center items-center">
        <AuthContext>
        <Outlet />
        </AuthContext>
      </div>
    </div>
  );
}

export default AuthLayout;
