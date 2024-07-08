// eslint-disable-next-line no-unused-vars
import React from "react";
import { Outlet,Navigate } from "react-router";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Success from "../components/alert/Success";
import { useStateContext } from "../context/ContextProvider";
import ClientContext from "../context/ClientContext";

function ClientLayout() {
  const { success,role,token } = useStateContext();

  if (!token || role !== "ADMIN") {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="px-16">
          <ClientContext>
            <Outlet />
          </ClientContext>
        </main>
        {success && <Success message={success} />}
      </div>
    </div>
  );
}

export default ClientLayout;
