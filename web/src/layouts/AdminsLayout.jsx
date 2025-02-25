// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useStateContext } from '../context/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import { AdminProvider } from '../context/AdminProvider';
import Success from '../components/alert/Success';
import Navbar from '../components/navbar/Navbar';

function AdminsLayout() {
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
            <AdminProvider>
              <Outlet />
            </AdminProvider>
          </main>
          {success && <Success message={success} />}
        </div>
      </div>
    );
}

export default AdminsLayout